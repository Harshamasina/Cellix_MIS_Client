import { Parallax } from 'react-parallax';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Popover, Table } from 'react-bootstrap';
import { VscPersonAdd } from 'react-icons/vsc';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';
import { Dna } from 'react-loader-spinner';
import { FaUserEdit } from 'react-icons/fa';
import DeleteEmployee from './DeleteEmployee';

const EmployeesDashboard = () => {
    const img="https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Employees.jpg";
    const [employeesData, setEmployeesData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://misbackend.cellixbio.info/api/getemployees');
                setEmployeesData(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response.data.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const popover = (
        <Popover className='popover'>
          <Popover.Body as="h6" className='popover-msg'>Create New Employee</Popover.Body>
        </Popover>
    );

    const updatePopover = (
        <Popover id="update-popover">
            <Popover.Body as="span" className='popover-msg'>Update Employee</Popover.Body>
        </Popover>
    );

    if(loading){
        return <div>
            <Dna
                visible={true}
                height="20%"
                width="20%"
                ariaLabel="dna-loading"
                wrapperClass='dna-wrapper'
                wrapperStyle={{marginLeft: '40%', marginTop: '7%'}}
            />
        </div>;
    };

    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    };

    return(
        <div>
            <Helmet>
                <title>Employees | MIS</title>
                <meta name="description" content="Cellix Bio MIS Application Employee Dashboard"></meta>
            </Helmet>

            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>Employees Dashboard</h1>
                            <OverlayTrigger 
                                placement="top" 
                                trigger={['hover', 'focus']}
                                overlay={popover}
                            >
                            <Link className='create-customNote-link' to="/register">
                                <VscPersonAdd />
                            </Link>
                        </OverlayTrigger>
                        </div>
                    </div>
                </div>
            </Parallax>

            <Table striped hover responsive className='mt-3 shadow-lg notification-table'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Employee ID</th>
                        <th>Designation</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        employeesData.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.emp_id}</td>
                                <td>{employee.designation}</td>
                                <td>
                                    {new Date(employee.createdAt).getDate().toString().padStart(2, '0')}-
                                    {(new Date(employee.createdAt).getMonth()+1).toString().padStart(2, '0')}-
                                    {new Date(employee.createdAt).getFullYear().toString()}, {new Date(employee.createdAt).getHours().toString().padStart(2, '0')}:
                                    {new Date(employee.createdAt).getMinutes().toString().padStart(2, '0')}
                                </td>
                                <td>
                                    <div className='employee-actions'>
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={updatePopover}>
                                            <Link to={"/updateemployee/"+employee._id} className="update-notification" target='_blank'>
                                                <FaUserEdit />
                                            </Link>
                                        </OverlayTrigger>
                                        <div className="delete-employee"><DeleteEmployee employeeId = {employee._id} /></div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default EmployeesDashboard;
