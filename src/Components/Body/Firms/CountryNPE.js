import { useParams } from "react-router";
import { Parallax } from 'react-parallax';
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Pagination } from '@mui/material';
import { Breadcrumbs } from '@mui/material';
import { Link } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { RiEditLine } from 'react-icons/ri';
import { TbFileDatabase } from 'react-icons/tb';

const CountryNPE = () => {
    const {countrycode} = useParams();
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/trends+1.jpg";
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [npeCountry, setNPECountry] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const patentData = await axios.get(`${process.env.REACT_APP_API_URL}/api/getcountry/${countrycode}`);
                setNPECountry(patentData.data[0].countryData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        }
        fetchData();
    }, [countrycode]);

    const handleChangePage = (event, value) => {
        setPageSize(15);
        setPage(value);
    };
    
    const itemsPerPage = pageSize;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const changeColorNPEStatus = (status) => {
        try{
            if(status === '1'){
                return('green');
            } else if (status === '2'){
                return('grey');
            } else if (status === '0') {
                return('red');
            } else {
                return('black');
            }
        } catch (err) {
            console.error(err);
        }
    };

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

    const popover = (
        <Popover className='popover'>
          <Popover.Body as="p" className='popover-msg'>Get More Info</Popover.Body>
        </Popover>
    );

    const updatePopover = (
        <Popover className='popover'>
          <Popover.Body as="p" className='popover-msg'>Edit NPE</Popover.Body>
        </Popover>
    );

    return(
        <div>
            <Helmet>
                <title>
                    {
                        countrycode === "US" ? " USA" :
                        countrycode === "EP" ? " Europe" :
                        countrycode === "SK" ? " Europe (EP)" :
                        countrycode === "JP" ? " Japan" :
                        countrycode === "SG" ? " Singapore" :
                        countrycode === "KR" ? " South Korea" :
                        countrycode === "NZ" ? " New Zealand" :
                        countrycode === "AU" ? " Australia" :
                        countrycode === "ZA" ? " South Africa" :
                        countrycode === "BR" ? " Brazil" :
                        countrycode === "MX" ? " Mexico" :
                        countrycode === "IL" ? " Israel" :
                        countrycode === "CA" ? " Canada" : 
                        countrycode === "CN" ? " China" : 
                        countrycode === "RU" ? " Russia" : 
                        countrycode === "IN" ? " India" : "NA"
                    } | Firms | MIS
                </title>
                <meta name="description" content="Cellix Bio MIS {countrycode} Firms"></meta>
            </Helmet>
            
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>
                                NPE's in {
                                    countrycode === "US" ? " USA" :
                                    countrycode === "EP" ? " Europe" :
                                    countrycode === "SK" ? " Europe" :
                                    countrycode === "JP" ? " Japan" :
                                    countrycode === "SG" ? " Singapore" :
                                    countrycode === "KR" ? " South Korea" :
                                    countrycode === "NZ" ? " New Zealand" :
                                    countrycode === "AU" ? " Australia" :
                                    countrycode === "ZA" ? " South Africa" :
                                    countrycode === "BR" ? " Brazil" :
                                    countrycode === "MX" ? " Mexico" :
                                    countrycode === "IL" ? " Israel" :
                                    countrycode === "CA" ? " Canada" :
                                    countrycode === "CN" ? " China" : 
                                    countrycode === "RU" ? " Russia" : 
                                    countrycode === "IN" ? " India" : "NA"
                                }
                            </h1>
                        </div>
                    </div>
                </div>
            </Parallax>

            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to="/home" className='BC-Links'>Home</Link>
                <Link to="/firms" className='BC-Links'>Firms</Link>
                <Link to={"/countrynpe/"+countrycode} className='BC-Links'>{countrycode} Firms</Link>
            </Breadcrumbs>

            <div className='npe-top-pagination-container'>
                <Pagination
                    count={Math.ceil(npeCountry.length / itemsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    size="medium" 
                    shape="rounded"
                />
            </div>

            <div className='firms-container'>
                <div className='box-container'>
                    {
                        npeCountry && npeCountry.slice(startIndex, endIndex).map((npe, index) => (
                            <div className="box" key={index}>
                                <h3><span className="firm-span">{npe.npe.npe_country}</span></h3>
                                <h3>Ref No: <Link className='refLink' to={"/patentinfo/"+npe.id}>{npe.ref_no}</Link></h3>
                                <h3>PCT Filing Date: <span className="firm-span">{npe.pct_dof}</span></h3>
                                <h3>Firm: <span className="firm-span">{npe.npe.npe_firms}</span></h3>
                                <h3>App No: <span className="firm-span">{npe.npe.npe_appno}</span></h3>
                                <h3>Filing Date: <span className="firm-span">{npe.npe.npe_dof ? npe.npe.npe_dof : "NA"}</span></h3>
                                <h3>
                                    Grant Desc: 
                                    <span className={changeColorNPEStatus(npe.npe.npe_grant_desc)}>
                                        {
                                            npe.npe.npe_grant_desc === "1" ? " Granted" :
                                            npe.npe.npe_grant_desc === "2" ? " Under Examination" :
                                            npe.npe.npe_grant_desc === "0" ? " Dead" : " NA"
                                        }
                                    </span>
                                </h3>

                                <OverlayTrigger 
                                    placement="left" 
                                    trigger={['hover', 'focus']}
                                    overlay={popover}
                                >
                                    <Link className='btn' to={"/patentinfo/"+npe.id} target="_blank">
                                        <TbFileDatabase />
                                    </Link>
                                </OverlayTrigger>

                                <OverlayTrigger
                                    placement="right"
                                    trigger={['hover', 'focus']}
                                    overlay={updatePopover}
                                >
                                    <Link className='btn' to={"/patentupdate/"+npe.id} target="_blank">
                                        <RiEditLine />
                                    </Link>
                                </OverlayTrigger>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='npe-bottom-pagination-container'>
                <Pagination
                    count={Math.ceil(npeCountry.length / itemsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    size="large" 
                    showFirstButton 
                    showLastButton
                    shape="rounded"
                />
            </div>
        </div>
    );
}

export default CountryNPE;