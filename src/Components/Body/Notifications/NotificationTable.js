import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";

const NotificationTable = () => {
    const [Notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const result = await axios.get('https://misbackend.cellixbio.info/api/notifications');
                setNotifications(result.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if(loading){
        return (
            <div>
                <Dna
                    visible={true}
                    height="20%"
                    width="20%"
                    ariaLabel="dna-loading"
                    wrapperStyle={{marginLeft: '40%', marginTop: '7%'}}
                />
            </div>
        );
    }

    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    }
    console.log(Notifications);
    return(
        <div>
            {/* {
                Notifications && Notifications.map((data) => (
                    <div key={data._id}>
                        <p>{data.ref_no}</p>
                        {
                            data.dates && data.dates.map((date, i) => (
                                <div key={i}>
                                    <p>{date.fieldName}</p>
                                    <p>{date.fieldValue}</p>
                                    <p>{date.differenceInDays}</p>
                                </div>
                            ))
                        }
                    </div>
                ))
            } */}
        </div>
    );
}

export default NotificationTable;