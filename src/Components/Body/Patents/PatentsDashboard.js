import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PatentDashboard = () => {
    const [patents, setPatents] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try{
                const patentsData = await axios.get("http://localhost:5000/api/getpatents");
                setPatents(patentsData);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    console.log(patents);
    return(
        <div>
            <div className='container'>
                <h2>Cellix Bio Patents Data</h2>
                <div className='box-container'>
                    {
                        patents.data && patents.data.map((patent, i) => (
                            <div className='box' key={i}>
                                <h3>Ref No: <Link className='refLink' to={"/patentinfo/"+patent.ref_no} target="_blank">{patent.ref_no}</Link></h3>
                                <h4>PCT Number: <span>{patent.pct_appno}</span></h4>
                                <Link className='btn' to={"/patentinfo/"+patent.ref_no} target="_blank">Know More</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default PatentDashboard;