import axios from "axios";
import { useEffect, useState } from "react";
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const NPENotifications = () => {
    const [npeNotifications, setNPENotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://misbackend.cellixbio.info/api/npenotifications');
                setNPENotifications(res.data);
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
            } else if (days > 15 && days <= 60) {
              return 'yellow-notification';
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
                wrapperStyle={{marginLeft: '40%', marginTop: '7%'}}
            />
        </div>;
    };

    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    };

    return(
        <div>
            <h3 className="notification-header">NPE Notifications</h3>
            
            <Table striped hover className='mt-3 shadow-lg notification-table'>
                <thead>
                    <tr>
                        <th>SNo</th>
                        <th>Ref No</th>
                        <th>Country</th>
                        <th>Patent / Application Number</th>
                        <th>Field Name</th>
                        <th>Field Value</th>
                        <th>Days Left</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        npeNotifications && npeNotifications.map((npeNotification, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><Link className='reference-links' to={"/patentinfo/"+npeNotification.ref_no} target="_blank">{npeNotification.ref_no}</Link></td>
                                <td>{npeNotification.npe_country}</td>
                                <td>{npeNotification.npe_patent ? npeNotification.npe_patent : npeNotification.npe_appno}</td>
                                <td>{npeNotification.fieldName}</td>
                                <td>{npeNotification.fieldValue}</td>
                                <td className={changeColor(npeNotification.daysLeft)}>{npeNotification.daysLeft}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default NPENotifications;