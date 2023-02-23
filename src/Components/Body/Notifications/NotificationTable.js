import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationTable = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/getpatents');
            setData(result.data);
        }
        fetchData();
    }, []);
    console.log(data);
    return(
        <div>
            <h1>Notification Table</h1>
        </div>
    );
}
export default NotificationTable;