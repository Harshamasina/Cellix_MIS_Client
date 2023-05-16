import { useEffect, useState } from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { HiInformationCircle } from "react-icons/hi";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import axios from 'axios';
import { BiErrorAlt } from 'react-icons/bi';
import { MdOutlineEditNote } from 'react-icons/md';

const SearchPatents = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchPatent, setSearchPatent] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm) {
                try {
                    const response = await axios.get(`https://misbackend.cellixbio.info/api/searchpatents/${searchTerm.replaceAll("/", "%2F")}`);
                    setSearchPatent(response.data);
                    setError('');
                } catch (error) {
                    console.log(error);
                    setSearchPatent([]);
                    setError(error.message);
                }
            } else {
                setSearchPatent([]);
                setError('');
            }
        };
        fetchSearchResults();
    }, [searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

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

    return(
        <div>
            <div class="search-box">
                <button class="btn-search"><AiOutlineFileSearch className='search-icon' /></button>
                <input 
                    type="text" 
                    className="input-search" 
                    placeholder="Enter Ref / PRV / PCT / NPE Numbers"
                    onChange={handleSearch}
                />
            </div>
            
            <div className='search-container'>
                <div className='box-container'>
                    {error && <div style={{color: '#0E6E59', fontSize: '40px' }}><span style={{fontSize: "50px", color: "#FF4433"}}><BiErrorAlt /></span>{error}</div>}
                    {
                        (searchPatent && searchPatent.length === 0 && searchTerm) ? 
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

export default SearchPatents;