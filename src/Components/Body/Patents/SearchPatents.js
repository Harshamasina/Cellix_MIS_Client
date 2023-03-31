import { useState } from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { HiInformationCircle } from "react-icons/hi";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const SearchPatents = () => {
    const [searchPatent, setSearchPatent] = useState();
    const searchHandle = async(e) => {
        let key = e.target.value;
        if(key){
            let searchResult = await fetch(`https://misbackend.cellixbio.info/api/searchpatents/${key.replaceAll("/", "%2F")}`);
            searchResult = await searchResult.json();
            if(searchResult){
                setSearchPatent(searchResult);
            } else {
                console.log("No Patent Found");
            }
        }
    };

    const popover = (
        <Popover className='popover'>
          <Popover.Body as="p" className='popover-msg'>Get More Info</Popover.Body>
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
                    onChange={searchHandle}
                >
                </input>
            </div>
            
            <div className='search-container'>
                <div className='box-container'>
                    {
                        searchPatent && searchPatent.length === 0 ? 
                            <div className='searchPatentImg-container'><img className="searchPatentImg" src="https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Search+Not+Found.png" alt="not Found"></img></div> : 
                        searchPatent && searchPatent.map((patent, i) => (
                            <div className='box' key={i}>
                                <h3>Ref No: <Link className='refLink' to={"/patentinfo/"+patent.ref_no}>{patent.ref_no}</Link></h3>
                                <h4>PRV Filing: <span>{patent.prv[0].prv_dof}</span></h4>
                                {patent.pct_appno ? (<h4>PCT Number: <span>{patent.pct_appno}</span></h4>) : ""}
                                <uL className='country-ul'>
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
                                </uL>
                                <OverlayTrigger 
                                    placement="auto" 
                                    delay={{ show: 250, hide: 400 }}
                                    trigger={['hover', 'focus']}
                                    overlay={popover}
                                >
                                    <Link className='btn' to={"/patentinfo/"+patent.ref_no} target="_blank">
                                        <HiInformationCircle />
                                    </Link>
                                </OverlayTrigger>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchPatents;