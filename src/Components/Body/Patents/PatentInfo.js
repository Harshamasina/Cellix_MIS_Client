import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { Parallax } from 'react-parallax';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';
import { FaRegEdit } from 'react-icons/fa';
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Breadcrumbs } from '@mui/material';

const PatentInfo = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/graphs.jpg";
    const {ref} = useParams();
    const [patent, setPatent] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const patentData = await axios.get(`https://misbackend.cellixbio.info/api/getpatent/${ref}`);
                setPatent(patentData.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        }
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
                    wrapperStyle={{marginLeft: '40%', marginTop: '7%'}}
                />
            </div>
        );
    }

    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    }

    const renderPopover = (date) => {
        try{
            if (!date) {
                return <Popover />;
            }
            const today = new Date();
            const apiDate = new Date(date);
            // const monthDiff = (today.getFullYear() - apiDate.getFullYear()) * 12 + (today.getMonth() - apiDate.getMonth());
            const timeDiff = apiDate.getTime() - today.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            const diffMonths = Math.ceil(daysDiff / 30);
            if (daysDiff < 0 || daysDiff > 60) {
                return <Popover />;
            }
            if(diffMonths <= 2){
                return(
                    <Popover>
                        <Popover.Body>
                            {daysDiff} days until {apiDate.toLocaleDateString()}! 
                        </Popover.Body>
                    </Popover>
                )
            }
        } catch(err) {
            console.error(err);
        }
    }

    const changeColorDates = (date) => {
        try{
            const today = new Date();
            const apiDate = new Date(date);
            const timeDiff = apiDate.getTime() - today.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            const diffMonths = Math.ceil(daysDiff / 30);
            if(daysDiff < 0){
                return('black');
            }
            if(daysDiff <= 7){
                return('red');
            } else if (diffMonths <= 2){
                return('orange');
            }
            else{
                return('black');
            }
        } catch (err) {
            console.error(err);
        }
    };
    
    return(
        <div>
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>{patent.ref_no}</h1>
                        </div>
                        <Link className='patentinfo-link' to={"/patentupdate/"+patent._id}><FaRegEdit className='patentinfo-icon'/></Link>
                    </div>
                </div>
            </Parallax>
            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to="/home" className='BC-Links'>Home</Link>
                <Link to="/patents" className='BC-Links'>Patents Dashboard</Link>
                <Link to={"/patentinfo/"+patent.ref_no} className='BC-Links'>{patent.ref_no}</Link>
            </Breadcrumbs>
            <Tabs
                defaultActiveKey="NPE"
                id="uncontrolled-tab-example"
                className="mb-3 Tabs"
                fill
            >
                <Tab eventKey="PRV" title="Provisional Patent (PRV) Data" tabClassName='tab-item'>
                    <div className='tab-data'>
                        <p>PRV Application Number: <span>{patent.prv_appno}</span></p>
                        <p>PRV Date of Filing: <span>{patent.prv_dof}</span></p>
                    </div>
                </Tab>
                <Tab eventKey="PCT" title="Patent Corporation Treaty (PCT) Data" tabClassName='tab-item'>
                    <div className='tab-data'>
                        <p>PCT Number: <span>{patent.pct_appno}</span></p>
                        <OverlayTrigger trigger={['hover', 'focus']}  placement="auto" overlay={renderPopover(patent.pct_dof)}><p>PCT Date of Filing: <span className={changeColorDates(patent.pct_dof)}>{patent.pct_dof}</span></p></OverlayTrigger>
                        <p>PCT ISA Date: <span>{patent.pct_isa}</span></p>
                        <OverlayTrigger trigger={['hover', 'focus']}  placement="auto" overlay={renderPopover(patent.pct_18)}><p>PCT Publication Date: <span className={changeColorDates(patent.pct_18)}>{patent.pct_18}</span></p></OverlayTrigger>
                        <OverlayTrigger trigger={['hover', 'focus']}  placement="auto" overlay={renderPopover(patent.pct_22_md)}><p>PCT 22 Month Date: <span className={changeColorDates(patent.pct_22_md)}>{patent.pct_22_md}</span></p></OverlayTrigger>
                        <OverlayTrigger trigger={['hover', 'focus']}  placement="auto" overlay={renderPopover(patent.pct_30_31)}><p>PCT 30 / 31 Month Date: <span className={changeColorDates(patent.pct_30_31)}>{patent.pct_30_31}</span></p></OverlayTrigger>
                        <OverlayTrigger trigger={['hover', 'focus']}  placement="auto" overlay={renderPopover(patent.pct_dl)}><p>PCT Deadline: <span className={changeColorDates(patent.pct_dl)}>{patent.pct_dl}</span></p></OverlayTrigger>
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
                                                <p>NPE Country Divisional Number: <span>{npeData.npe_country_div}</span></p>
                                                <p>NPE Application Number: <span>{npeData.npe_appno}</span></p>
                                                <p>NPE Date of Filing: <span>{npeData.npe_dof}</span></p>
                                                <p>NPE Firm: <span>{npeData.npe_firms}</span></p>
                                                <h4>Examination Stage</h4>
                                                {
                                                    npeData.npe_oa && npeData.npe_oa.map((oaData, i) => (
                                                        <OverlayTrigger trigger={['hover', 'focus']}  placement="auto" overlay={renderPopover(oaData.npe_oa_date)}><p key={i}>{oaData.npe_oa_descp}: <span className={changeColorDates(oaData.npe_oa_date)}>{oaData.npe_oa_date}</span></p></OverlayTrigger>
                                                    ))
                                                }
                                                <p>NPE Grant Decision: <span>{npeData.npe_grant_desc}</span></p>
                                                <p>NPE Grant Date: <span>{npeData.npe_grant}</span></p>
                                                <p>NPE Issue Fee: <span>{npeData.npe_if}</span></p>
                                                <h4>Annuity Stage</h4>
                                                {
                                                    npeData.npe_oa && npeData.npe_af.map((afData, i) => (
                                                        <OverlayTrigger trigger={['hover', 'focus']}  placement="auto" overlay={renderPopover(afData.npe_af_date)}><p key={i}>{afData.npe_af_descp}: <span className={changeColorDates(afData.npe_af_date)}>{afData.npe_af_date}</span></p></OverlayTrigger>
                                                    ))
                                                }
                                                <p>NPE Patent Number: <span>{npeData.npe_patent}</span></p>
                                                <OverlayTrigger trigger={['hover', 'focus']}  placement="auto" overlay={renderPopover(npeData.npe_if)}><p>NPE Issue Fee Date: <span className={changeColorDates(npeData.npe_if)}>{npeData.npe_if}</span></p></OverlayTrigger>
                                                <p>NPE Request for Examination Date: <span>{npeData.npe_rfe}</span></p>
                                                <h4>Notes</h4>
                                                <p className='NPE-notes'>{npeData.npe_notes}</p>
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

export default PatentInfo;