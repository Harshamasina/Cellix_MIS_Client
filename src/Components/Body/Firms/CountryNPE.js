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
                const patentData = await axios.get(`https://misbackend.cellixbio.info/api/getfirms/${countrycode}`);
                setNPECountry(patentData.data);
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
    }

    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    }

    return(
        <div>
            <Helmet>
                <title>
                {
                    countrycode === "US" ? " USA" :
                    countrycode === "EP" ? " Europe" :
                    countrycode === "JP" ? " Japan" :
                    countrycode === "SG" ? " Singapore" :
                    countrycode === "KR" ? " South Korea" :
                    countrycode === "NZ" ? " New Zealand" :
                    countrycode === "AU" ? " Australia" :
                    countrycode === "ZA" ? " South Africa" :
                    countrycode === "BR" ? " Brazil" :
                    countrycode === "IL" ? " Israel" :
                    countrycode === "CA" ? " Canada" : 
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
                                    countrycode === "JP" ? " Japan" :
                                    countrycode === "SG" ? " Singapore" :
                                    countrycode === "KR" ? " South Korea" :
                                    countrycode === "NZ" ? " New Zealand" :
                                    countrycode === "AU" ? " Australia" :
                                    countrycode === "ZA" ? " South Africa" :
                                    countrycode === "BR" ? " Brazil" :
                                    countrycode === "IL" ? " Israel" :
                                    countrycode === "CA" ? " Canada" : 
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

            <div className='container'>
                <div className='box-container'>
                    {
                        npeCountry && npeCountry.slice(startIndex, endIndex).map((npe, index) => (
                            <div className="box" key={index}>
                                <h4>{npe.npe_country}</h4>
                                <h4>NPE Firm: <span>{npe.npe_firms ? npe.npe_firms : "NA"}</span></h4>
                                <h4>NPE Application: <span>{npe.npe_appno}</span></h4>
                                <h4>NPE Date of Filing: <span>{npe.npe_dof ? npe.npe_dof : "NA"}</span></h4>
                                <h4>NPE Patent: <span>{ npe.npe_patent ? npe.npe_patent : "NA" }</span></h4>
                                <h4>NPE Grant Date: <span>{npe.npe_grant ? npe.npe_grant : "NA"}</span></h4>
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