import axios from "axios";
import { useEffect, useState } from "react";
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const PCTNotifications = () => {
    const [PCTNotifications, setPCTNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://misbackend.cellixbio.info/api/pctnotifications');
                setPCTNotifications(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response.data.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if(loading){
        return <div>
            <Dna
                visible={true}
                height="20%"
                width="20%"
                ariaLabel="dna-loading"
                wrapperStyle={{marginLeft: '40%', marginTop: '7%'}}
            />
        </div>;
    };

    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    };

    const changeColor = (days) => {
        try {
            if (days >= 0 && days <= 3) {
              return 'red-notification';
            } else if (days > 3 && days <= 15) {
                return 'orange-notification';
            } else if (days > 15 && days <= 60) {
              return 'yellow-notification';
            } else {
                return 'black';
            }
        } catch (err) {
            console.error(err);
        }
    };
    
    return(
        <div>
            <h3 className="notification-header">PCT Notifications</h3>
            <Table striped hover className='mt-3 shadow-lg notification-table'>
                <thead>
                    <th>Sno</th>
                    <th>Reference Number</th>
                    <th>Field</th>
                    <th>Date</th>
                    <th>Days Left</th>
                </thead>
                <tbody>
                    {
                        PCTNotifications && PCTNotifications.map((PCTNotification, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td><Link className='reference-links' to={"/patentinfo/"+PCTNotification.ref_no} target="_blank">{PCTNotification.ref_no}</Link></td>
                                <td>{PCTNotification.fieldName}</td>
                                <td>{PCTNotification.fieldValue}</td>
                                <td className={changeColor(PCTNotification.daysLeft)}>{PCTNotification.daysLeft}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default PCTNotifications;