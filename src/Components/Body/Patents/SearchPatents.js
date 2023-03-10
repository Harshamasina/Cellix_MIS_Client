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
                    class="input-search" 
                    placeholder="Enter Ref / PRV / PCT / NPE Numbers"
                    onChange={searchHandle}
                >
                </input>
            </div>
            <div className='container'>
                <div className='box-container'>
                {
                        searchPatent && searchPatent.map((patent, i) => (
                            <div className='box' key={i}>
                                <h3>Ref No: <Link className='refLink' to={"/patentinfo/"+patent.ref_no}>{patent.ref_no}</Link></h3>
                                <h4>PRV Filing: <span>{patent.prv[0].prv_dof}</span></h4>
                                {patent.pct_appno ? (<h4>PCT Number: <span>{patent.pct_appno}</span></h4>) : ""}
                                {patent.npe && patent.npe.length > 0 && (<h4>NPE Application Numbers</h4>)}
                                <ul className='country-ul'>
                                    {
                                        patent.npe && patent.npe.map((npe) => (
                                            <Link to={"/patentinfo/"+patent.ref_no} className='country-link' target="_blank" key={npe}>
                                                <li>{npe.npe_appno}</li>
                                            </Link>
                                        ))
                                    }
                                </ul>
                                {patent.npe && patent.npe.length > 0 && (<h4>NPE Patent Numbers</h4>)}
                                <ul className='country-ul'>
                                    {
                                        patent.npe && patent.npe.map((npe) => (
                                            <Link to={"/patentinfo/"+patent.ref_no} className='country-link' target="_blank" key={npe}>
                                                <li>{npe.npe_patent}</li>
                                            </Link>
                                        ))
                                    }
                                </ul>
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