import { Parallax } from 'react-parallax';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { TbFileDatabase } from 'react-icons/tb';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const NPEApplicationsDashboard = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Pie+Graph.jpg";
    const {desc} = useParams();
    const [npeData, setNPEData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(30);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`https://misbackend.cellixbio.info/api/getnpe/${desc}`);
                setNPEData(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    }, [desc]);

    const handleChangePage = (event, value) => {
        setPageSize(30);
        setPage(value);
    };
    
    const itemsPerPage = pageSize;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if(loading){
        return <div>
            <Dna
                visible={true}
                height="20%"
                width="20%"
                ariaLabel="dna-loading"
                wrapperClass='dna-wrapper'
                wrapperStyle={{marginLeft: '40%', marginTop: '10%'}}
            />
        </div>;
    }

    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    }

    const popover = (
        <Popover className='popover'>
          <Popover.Body as="p" className='popover-msg'>Get More Info</Popover.Body>
        </Popover>
    );

    return(
        <div>
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='UpdatePageContent'>
                            <h1>
                                {
                                    desc === "1" ? " Granted" :
                                    desc === "2" ? " Lapsed" :
                                    desc === "3" ? " Abandoned" :
                                    desc === "4" ? " Under examination" :
                                    desc === "0" ? " Rejected" : "NA"
                                } NPE Applications
                            </h1>
                        </div>
                    </div>
                </div>
            </Parallax>

            <div>
                <div className='npe-top-pagination-container'>
                    <Pagination
                        count={Math.ceil(npeData[0].npeData.length / itemsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        size="medium" 
                        shape="rounded"
                    />
                </div>

                <div className='container'>
                    <div className='box-container'>
                        {
                            npeData[0].npeData && npeData[0].npeData.slice(startIndex, endIndex).map((npe, index) => (
                                <div className='box' key={index}>
                                    <h3>Ref No: <Link className='refLink' to={"/patentinfo/"+npe.ref_no}>{npe.ref_no}</Link></h3>
                                    <h3>PCT Filing Date: <span>{npe.pct_dof}</span></h3>
                                    <h3>Country: <span>{npe.npe.npe_country}</span></h3>
                                    <h3>App No: <span>{npe.npe.npe_appno}</span></h3>
                                    <h3>Filing Date: <span>{npe.npe.npe_dof ? npe.npe.npe_dof : "NA"}</span></h3>
                                    <h3>Grant Date: <span>{npe.npe.npe_grant ? npe.npe.npe_grant : "NA"}</span></h3>
                                    <h3>Patent No: <span>{npe.npe.npe_patent ? npe.npe.npe_patent : "NA"}</span></h3>
                                    <OverlayTrigger 
                                    placement="auto" 
                                    delay={{ show: 250, hide: 400 }}
                                    trigger={['hover', 'focus']}
                                    overlay={popover}
                                >
                                    <Link className='btn' to={"/patentinfo/"+npe.ref_no} target="_blank">
                                        <TbFileDatabase />
                                    </Link>
                                </OverlayTrigger>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='npe-bottom-pagination-container'>
                    <Pagination
                        count={Math.ceil(npeData[0].npeData.length / itemsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        size="large" 
                        showFirstButton 
                        showLastButton
                        shape="rounded"
                    />
                </div>
            </div>
        </div>
    );
}

export default NPEApplicationsDashboard;