import { useParams } from "react-router";
import { Parallax } from 'react-parallax';
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dna } from  'react-loader-spinner';
import { MdOutlineEditNote, MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { Link } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { BiErrorAlt } from "react-icons/bi";

const SearchApplications = () => {
    const { key } = useParams();
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/search+1.jpg";
    const [searchPatent, setSearchPatent] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (key) {
                try {
                    const response = await axios.get(`https://misbackend.cellixbio.info/api/searchpatents/${key.replaceAll("/", "%2F")}`);
                    setSearchPatent(response.data);
                    setError('');
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    setSearchPatent([]);
                    setError(error.message);
                    setLoading(false);
                }
            } else {
                setSearchPatent([]);
                setError('');
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, [key]);

    const popover = (
        <Popover className='popover'>
          <Popover.Body as="p" className='popover-msg'>Get More Info</Popover.Body>
        </Popover>
    );

    const updatePopover = (
        <Popover className='popover'>
          <Popover.Body as="p" className='popover-msg'>Update Application Family</Popover.Body>
        </Popover>
    );

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

    return(
        <div>
            <Helmet>
                <title>Search Applications | MIS</title>
                <meta name="description" content="Search Application"></meta>
            </Helmet>

            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>Search Applications</h1>
                            {
                                searchPatent.length > 0 ? 
                                (<h4>Showing {searchPatent.length} result{searchPatent.length === 1 ? '' : 's'} for: {key}</h4>) : 
                                (<h4>No results found for: {key}</h4>)
                            }
                        </div>
                    </div>
                </div>
            </Parallax>

            <div className='search-container'>
                <div className='box-container'>
                    {error && <div style={{color: '#0E6E59', fontSize: '40px' }}><span style={{fontSize: "50px", color: "#FF4433"}}><BiErrorAlt /></span>{error}</div>}
                    {
                        (searchPatent && searchPatent.length === 0 && key) ? 
                        <div className='searchPatentImg-container'>
                          <img className="searchPatentImg" src="https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Search+Not+Found.png" alt="not Found"></img>
                        </div> :                     
                        searchPatent && searchPatent.map((patent, i) => (
                            <div className='box' key={i}>
                                <h3>Ref No: <Link className='refLink' to={"/patentinfo/"+patent._id}>{patent.ref_no}</Link></h3>
                                {/* <h4>PRV Filing: <span>{patent.prv[0].prv_dof}</span></h4> */}
                                {patent.pct_appno ? (<h4>PCT Number: <span>{patent.pct_appno}</span></h4>) : ""}

                                <ul className='country-ul'>
                                    {
                                        patent.npe && patent.npe.map((npe) => (
                                            <li>
                                                <ul className='search-ul'>
                                                    <li className='search-span'>Country: <span>{npe.npe_country}</span></li>
                                                    <li className='search-span'>App No: <span>{npe.npe_appno ? npe.npe_appno : (<span>NA</span>)}</span></li>
                                                    <li className='search-span'>Patent No: <span>{npe.npe_patent ? npe.npe_patent : (<span>NA</span>)}</span></li>
                                                </ul>
                                            </li>
                                        ))
                                    }
                                </ul>

                                <OverlayTrigger 
                                    placement="left"
                                    trigger={['hover', 'focus']}
                                    overlay={popover}
                                >
                                    <Link className='btn' to={"/patentinfo/"+patent._id} target="_blank">
                                        <HiInformationCircle />
                                    </Link>
                                </OverlayTrigger>

                                <OverlayTrigger 
                                    placement="right"
                                    trigger={['hover', 'focus']}
                                    overlay={updatePopover}
                                >
                                    <Link className='btn' to={"/patentupdate/"+patent._id} target="_blank">
                                        <MdOutlineEditNote />
                                    </Link>
                                </OverlayTrigger>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchApplications;