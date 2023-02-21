import { useState } from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const SearchPatents = () => {
    const [searchPatent, setSearchPatent] = useState();
    const searchHandle = async(e) => {
        let key = e.target.value;
        if(key){
            let searchResult = await fetch(`http://localhost:5000/api/searchpatents/${key.replaceAll("/", "%2F")}`);
            searchResult = await searchResult.json();
            if(searchResult){
                setSearchPatent(searchResult);
            } else {
                console.log("No Patent Found");
            }
        }
    }
    console.log(searchPatent);
    return(
        <div>
            <div class="search-box">
                <button class="btn-search"><AiOutlineFileSearch className='search-icon' /></button>
                <input 
                    type="text" 
                    class="input-search" 
                    placeholder="Enter Ref Number / PRV Number / PCT Number"
                    onChange={searchHandle}
                >
                </input>
            </div>
            <div className='container'>
                <div className='box-container'>
                    {
                        searchPatent && searchPatent.length === 0 ?
                        <div className='no-results'><img src='https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Search+Not+Found.png' alt='search'></img></div> :
                        searchPatent && searchPatent.map((patent, i) => (
                            <div className='box' key={i}>
                                <h3>Ref No: <Link className='refLink' to={"/patentinfo/"+patent.ref_no} target="_blank">{patent.ref_no}</Link></h3>
                                <h4>PRV Number: <span>{patent.prv_appno}</span></h4>
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

export default SearchPatents;