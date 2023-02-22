import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dna } from  'react-loader-spinner';
import { VscGoToFile } from "react-icons/vsc";
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";

const PatentDashboard = () => {
    const [patents, setPatents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const patentsData = await axios.get("/api/getpatents");
                setPatents(patentsData.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    // if (patents[0] && patents[0].npe) {
    //     console.log(patents[0].npe);
    // }
    if(loading){
        return <div>
            <Dna
                visible={true}
                height="20%"
                width="20%"
                ariaLabel="dna-loading"
                wrapperStyle={{marginLeft: '40%'}}
            />
        </div>;
    }
    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    }
    return(
        <div>
            <div className='container'>
                <h2>Cellix Bio Patents Data</h2>
                <div className='box-container'>
                    {
                        patents.map((patent, i) => (
                            <div className='box' key={i}>
                                <h3>Ref No: <Link className='refLink' to={"/patentinfo/"+patent.ref_no} target="_blank">{patent.ref_no}</Link></h3>
                                <h4>PCT Number: <span>{patent.pct_appno}</span></h4>
                                <ul className='country-ul'>
                                    {
                                        patent.npe && patent.npe.map((npe) => (
                                            <Link to={"/patentinfo/"+patent.ref_no} className='country-link'><li key={npe}>{npe.npe_country}</li></Link>
                                        ))
                                    }
                                </ul>
                                <Link className='btn' to={"/patentinfo/"+patent.ref_no} target="_blank"><VscGoToFile /></Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default PatentDashboard;