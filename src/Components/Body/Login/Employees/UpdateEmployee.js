import { Parallax } from 'react-parallax';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Dna } from 'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';
import PhoneInput from 'react-phone-input-2';
import { Button, Modal } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const UpdateEmployee = () => {
    const { id } = useParams();
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/employeeUpdate.jpg";
    const [employeeData, setEmployeeData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        emp_id: "",
        designation: ""
    });
    const [confirmCode, setConfirmCode] = useState('');
    const [errorMessage, setErrorMessage]  = useState('');
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://misbackend.cellixbio.info/api/getemployeeid/${id}`);
                setEmployeeData(res.data);
                setError(res.data.message);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setEmployeeData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleUpdateModal = async () => {
        try{
            const res = await axios.patch(`https://misbackend.cellixbio.info/api/updateemployee/${id}`, employeeData, {
                headers: { 'confirmCode': confirmCode },
            });
            if(res.status === 201){
                console.log(res);
                setErrorMessage(res.data.message);
                alert("Employee Information Updated Successfully");
                setShowModal(false);
            }
        } catch (err) {
            console.error(err);
            setErrorMessage(err.response.data.error);
            setConfirmCode('');
            setShowModal(false);
        }
    };

    const handleModalClose= () => {
        setShowModal(false);
        setShowPassword(false);
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);

    if(loading){
        return (
            <div>
                <Dna
                    visible={true}
                    height="20%"
                    width="20%"
                    ariaLabel="dna-loading"
                    wrapperClass='dna-wrapper'
                    wrapperStyle={{marginLeft: '40%', marginTop: '10%'}}
                />
            </div>
        );
    };

    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    };

    return(
        <div>
            <Parallax bgImage={ img } strength={150} bgImageAlt="parallaximg">
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                        </div>
                    </div>
                </div>
            </Parallax>

            <div className='Login-Container'>
                <form className='loginform'>
                <input 
                        type="text" 
                        placeholder='Enter your First Name*'
                        autoComplete="off"
                        name='first_name'
                        value={employeeData.first_name}
                        onChange={handleInputs}
                    />

                    <input 
                        type="text" 
                        placeholder='Enter your Last Name*'
                        autoComplete="off"
                        name='last_name'
                        value={employeeData.last_name}
                        onChange={handleInputs}
                    />

                    <input 
                        type="email" 
                        placeholder='Enter your Email*'
                        autoComplete="off"
                        name='email'
                        value={employeeData.email}
                        onChange={handleInputs}
                    />

                    <PhoneInput
                        country={"in"}
                        value={employeeData.phone}
                        onChange={(value) => {
                            const phone = value.startsWith("+") ? value : `+${value}`;
                            setEmployeeData({ ...employeeData, phone });
                        }}
                        inputClass="phone-input"
                        placeholder="Enter your Phone Number"
                        inputProps={{
                            className: "phone-input",
                        }}
                        inputStyle={{ paddingLeft: "50px", marginTop: "3%" }}
                        buttonStyle={{
                            height: "40px",
                            marginLeft: "13px",
                            borderRadius: "5px",
                            marginTop: "3.5%",
                        }}
                    />  

                    <input 
                        type="text" 
                        placeholder='Enter your Employee Id*'
                        autoComplete="off"
                        name='emp_id'
                        value={employeeData.emp_id}
                        onChange={handleInputs}
                    />

                    <input 
                        type="text" 
                        placeholder='Enter your Designation*'
                        autoComplete="off"
                        name='designation'
                        value={employeeData.designation}
                        onChange={handleInputs}
                    />

                    <input 
                        type="button" 
                        className="loginbutton" 
                        value="Update Employee"
                        onClick={handleUpdate}
                    />
                    
                    <h4 className='error-message'>{errorMessage}</h4>

                    <Modal show={showModal} onHide={handleModalClose} backdrop="static" keyboard={false} size="lg" centered>
                        <Modal.Header >
                            <Modal.Title className='Modal-title-pct'>Confirm Notification Update</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Are you sure you want to update the form? Please verify all data inserted correctly if so Please enter the confirmation code to update the notification</p>
                            <div className='delete-input-box'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter confirmation code"
                                        value={confirmCode}
                                        onChange={ (e) => setConfirmCode(e.target.value) }
                                    />
                                    <div className="eye-icon" onClick={toggleShowPassword}>
                                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                                    </div>
                                </div>
                                {errorMessage && ( <p className="text-danger mt-3">{errorMessage}</p> )}
                                <span className='forgot-code' onClick={() => alert("Please contact your Admin")}>Forgot Confirmation Code?</span>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button className='signout-modal-button' onClick={handleModalClose}>Cancel</Button>
                            <Button className = "close-button" onClick={handleUpdateModal} disabled={!confirmCode}>Submit</Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="login-links">
                        <Link to='/employeedashboard' className='register-Link'>Back to Employees Dashboard</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateEmployee;
