import { Parallax } from 'react-parallax';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { CgDatabase } from 'react-icons/cg';

const DeletedApplications = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/trends+1.jpg";
    const [patents, setPatents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://misbackend.cellixbio.info/api/deletedapplications');
                setPatents(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
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
                wrapperStyle={{ marginLeft: '40%', marginTop: '7%' }}
            />
        </div>;
    }

    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    }

    return(
        <div>
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='UpdatePageContent'>
                            <h1>Deleted Application Families</h1>
                        </div>
                    </div>
                </div>
            </Parallax>
            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to="/home" className='BC-Links'>Home</Link>
                <Link to="/patents" className='BC-Links'>Application Dashboard</Link>
                <Link to="/deletedapplications" className='BC-Links'>Deleted Application Families</Link>
            </Breadcrumbs>
            <div className='container'>
                <div className='box-container'>
                    {
                        patents && patents.map((patent, i) => (
                            <div className='box' key={i}>
                                <h3>Ref No: <Link className='refLink' to={"/deletedapplication/"+patent.ref_no}>{patent.ref_no}</Link></h3>
                                <h4>PRV Filing: <span>{patent.prv[0].prv_dof}</span></h4>
                                {patent.pct_appno ? (<h4>PCT Number: <span>{patent.pct_appno}</span></h4>) : ""}
                                
                                <ul className='country-ul'>
                                    {
                                        patent.npe && patent.npe.map((npe) => (
                                            <Link to={"/deletedapplication/"+patent.ref_no} className='country-link' target="_blank" key={npe}>
                                                <li>
                                                    {npe.npe_country_div ? (npe.npe_country_div) : (npe.npe_country)}
                                                </li>
                                            </Link>
                                        ))
                                    }
                                </ul>

                                <Link className='btn' to={"/deletedapplication/"+patent.ref_no} target="_blank">
                                    <CgDatabase />
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default DeletedApplications;