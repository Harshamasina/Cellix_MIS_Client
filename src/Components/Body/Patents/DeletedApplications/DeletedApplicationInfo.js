import { useEffect, useState } from "react";
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { useParams } from "react-router";
import axios from "axios";
import { Parallax } from 'react-parallax';
import { Accordion, Tab, Tabs } from "react-bootstrap";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { HiArrowSmRight } from "react-icons/hi";

const DeletedApplicationInfo = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/search+1.jpg";
    const {ref} = useParams();
    const [patent, setPatent] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/deletedapplication/${ref}`);
                setPatent(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    }, [ref]);

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
    
    return (
        <div>
            <Helmet>
                <title>{ref} | Deleted Application | MIS</title>
                <meta name="description" content={ref}></meta>
            </Helmet>

            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>{ref}</h1>
                        </div>
                    </div>
                </div>
            </Parallax>

            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to="/home" className='BC-Links'>Home</Link>
                <Link to="/patents" className='BC-Links'>Application Dashboard</Link>
                <Link to="/deletedapplications" className='BC-Links'>Deleted Application Families</Link>
                <Link to={"/deletedapplication/"+patent.ref_no} className='BC-Links'>{patent.ref_no}</Link>
            </Breadcrumbs>

            <Tabs
                defaultActiveKey="PCT"
                id="uncontrolled-tab-example"
                className="mb-3 Tabs"
                fill
            >
                <Tab eventKey="PRV" title="Provisional Patent (PRV) Data" tabClassName='tab-item'>
                    {
                        patent.prv && patent.prv.map((prvData, prvIndex) => (
                            <div className='tab-data' key={prvIndex}>
                                <h4>PRV {prvIndex + 1}</h4>
                                <p>PRV Application Number: <span>{prvData.prv_appno}</span></p>
                                <p>PRV Application Number: <span>{prvData.prv_dof}</span></p>
                                <div>
                                    <p>{patent.prv_notes ? "PRV Notes: " : ""}</p>
                                    {
                                        patent.prv_notes.split(/\n+/).map((line, index) => (
                                            <p key={index} className='NPE-notes'>
                                                {line ? (<span className='NPE-notes-icon'><HiArrowSmRight /></span>) : ""} 
                                                {line}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </Tab>
                
                <Tab eventKey="PCT" title="Patent Corporation Treaty (PCT) Data" tabClassName='tab-item'>
                    <div className='tab-data'>
                        <p>PCT Number: <span>{patent.pct_appno}</span></p>
                        <p>PCT Date of Filing: <span>{patent.pct_dof}</span></p>
                        <p>PCT DAS Code: <span>{patent.pct_das}</span></p>
                        <p>PCT Publication Date: <span>{patent.pct_18}</span></p>
                        <p>PCT ISR Date: <span>{patent.pct_isr}</span></p>
                        <p>PCT 22 Month Date: <span>{patent.pct_22_md}</span></p>
                        <p>PCT 30 / 31 Month Date: <span>{patent.pct_30_31}</span></p>
                        <div>
                            <p>{patent.pct_notes ? "PCT Notes: " : ""}</p>
                            {
                                patent.pct_notes.split(/\n+/).map((line, index) => (
                                    <p key={index} className='NPE-notes'>
                                        {line ? (<span className='NPE-notes-icon'><HiArrowSmRight /></span>) : ""} 
                                        {line}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </Tab>
                
                <Tab eventKey="NPE" title="National Phase Entry (NPE) Data" tabClassName='tab-item'>
                    <Accordion alwaysOpen className='mb-4 custom-accordion'>
                        {
                            patent.npe && patent.npe.map((npeData, i) => (
                                <Accordion.Item eventKey={i} key={i}>
                                    <Accordion.Header>{npeData.npe_country}</Accordion.Header>
                                    <Accordion.Body>
                                        <div className='tab-npe-data shadow-lg'>
                                            <h4>Filing Stage</h4>
                                            <p>NPE Country: <span>{npeData.npe_country}</span></p>
                                            <p>NPE Firm: <span>{npeData.npe_firms}</span></p>
                                            <p>NPE Application Number: <span>{npeData.npe_appno}</span></p>
                                            <p>NPE Date of Filing: <span>{npeData.npe_dof}</span></p>
                                            <p>NPE Request for Examination Date: <span>{npeData.npe_rfe}</span></p>
                                            <h4>Examination Stage</h4>
                                            {
                                                npeData.npe_oa && npeData.npe_oa.map((oaData, i) => (
                                                    oaData.npe_oa_descp ? (
                                                        <p key={i}>
                                                            {oaData.npe_oa_descp}:  
                                                            <span style={{marginLeft: "1%"}}>
                                                                {oaData.npe_oa_date}
                                                            </span>
                                                        </p>
                                                    ) : ("")
                                                ))
                                            }
                                            <p>NPE Grant Decision: 
                                                <span>
                                                    {
                                                        npeData.npe_grant_desc === "1" ? " Granted" :
                                                        npeData.npe_grant_desc === "2" ? " Under examination" :
                                                        npeData.npe_grant_desc === "0" ? " Dead" : "NA"
                                                    }
                                                </span>
                                            </p>
                                            <p>NPE Grant Date: <span>{npeData.npe_grant}</span></p>
                                            <p>NPE Patent Number: <span>{npeData.npe_patent}</span></p>
                                            <h4>Annuity Stage</h4>
                                            {
                                                npeData.npe_oa && npeData.npe_af.map((afData, i) => (
                                                    afData.npe_af_descp ? (
                                                        <div>
                                                            <h5>Annuity {i + 1}</h5>
                                                            <p key={i}>
                                                                {afData.npe_af_descp}:
                                                                <span style={{marginLeft: "1%"}}>
                                                                    {afData.npe_af_date}
                                                                </span>
                                                            </p>
                                                            <p>NPE Grace Period : <span>{afData.npe_af_grace}</span></p>
                                                        </div>
                                                    ) : ("")
                                                ))
                                            }
                                            <p><span>{npeData.npe_if}</span></p>
                                            <h4>Notes</h4>
                                            {
                                                npeData.npe_notes.split(/\n+/).map((line, index) => (
                                                    <p key={index} className='NPE-notes'>
                                                        {line ? (<span className='NPE-notes-icon'><HiArrowSmRight /></span>) : ""} 
                                                        {line}
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))
                        }
                    </Accordion>
                </Tab>
            </Tabs>
        </div>
    );
}

export default DeletedApplicationInfo;