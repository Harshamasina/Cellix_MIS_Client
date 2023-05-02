import axios from "axios";
import { useEffect, useState } from "react";
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomNotificationTable = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://misbackend.cellixbio.info/api/getcnotifications');
                setNotifications(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response.data.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const changeColor = (days) => {
        try {
            if (days >= 0 && days <= 3) {
              return 'red-notification';
            } else if (days > 3 && days <= 15) {
                return 'orange-notification';
            } else if (days < 0) {
              return 'grey-notification';
            } else {
                return 'black';
            }
        } catch (err) {
            console.error(err);
        }
    };

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
            <h3 className="notification-header">Custom Notifications</h3>

            <Table striped hover responsive className='mt-3 shadow-lg notification-table'>
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>Reference Number</th>
                        <th>Field</th>
                        <th>Date</th>
                        <th style={{ width: '45%' }}>Description</th>
                        <th>Days Left</th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        notifications.map((notification, index) => (
                            <tr key={notification._id}>
                                <td>{index + 1}</td>
                                <td><Link className='reference-links' to={"/patentinfo/"+notification.ref_no} target="_blank">{notification.ref_no}</Link></td>
                                <td>{notification.field}</td>
                                <td style={{textAlign: 'center'}}>{notification.date}</td>
                                <td>{notification.descp}</td>
                                <td className={changeColor(notification.daysLeft)}>{notification.daysLeft}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default CustomNotificationTable;