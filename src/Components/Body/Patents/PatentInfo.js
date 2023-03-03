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
                        <p>PCT Date of Filing: <span>{patent.pct_dof}</span></p>
                        <p>PCT ISA Date: <span>{patent.pct_isa}</span></p>
                        <p>PCT Publication Date: <span>{patent.pct_18}</span></p>
                        <p>PCT 22 Month Date: <span>{patent.pct_22_md}</span></p>
                        <p>PCT 30/31 Date: <span>{patent.pct_30_31}</span></p>
                        <p>PCT Deadline: <span>{patent.pct_dl}</span></p>
                    </div>
                </Tab>
                <Tab eventKey="NPE" title="Non Practicing Entity (NPE) Data" tabClassName='tab-item'>
                    <Accordion alwaysOpen className='mb-4 custom-accordion'>
                        {
                            patent.npe && patent.npe.map((npe, i) => (
                                <Accordion.Item eventKey={i} key={i}>
                                    <Accordion.Header>{npe.npe_country}</Accordion.Header>
                                    <Accordion.Body>
                                        {
                                            npe.npe_country === 'US' || npe.npe_country === 'US(DIV)'? (
                                                <div className='tab-npe-data shadow-lg'>
                                                    <p>NPE Country: <span>{npe.npe_country}</span></p>
                                                    <p>NPE Application Number: <span>{npe.npe_appno}</span></p>
                                                    <OverlayTrigger trigger={['hover', 'focus']}  placement="auto" overlay={renderPopover(npe.npe_dof)}><p>NPE Date of Filing: <span className={changeColorDates(npe.npe_dof)}>{npe.npe_dof}</span></p></OverlayTrigger>
                                                    <p>NPE Firm: <span>{npe.npe_fer_f}</span></p>
                                                    <p>NPE FER Issue Date: <span>{npe.npe_fer_i}</span></p>
                                                    <p>NPE FER Final Date: <span>{npe.npe_fer_f}</span></p>
                                                    <p>NPE First Office Action Date: <span>{npe.npe_us_foa}</span></p>
                                                    <p>NPE Second Office Action Date: <span>{npe.npe_us_soa}</span></p>
                                                    <p>NPE request for Continuation: <span>{npe.npe_us_rc}</span></p>
                                                    <p>NPE Response to Examination Report: <span>{npe.npe_us_rr}</span></p>
                                                    <p>NPE Final Action: <span>{npe.npe_us_fa}</span></p>
                                                    <p>NPE Grant Date: <span>{npe.npe_grant}</span></p>
                                                    <p>NPE Patent Number: <span>{npe.npe_patent}</span></p>
                                                    <p>NPE Issue Fee Date: <span>{npe.npe_if}</span></p>
                                                    <p>NPE Annuities Date: <span>{npe.npe_annuity}</span></p>
                                                    <p>NPE Request for Examination Date: <span>{npe.npe_rfe}</span></p>
                                                </div>
                                            ) : npe.npe_country === 'EP' ? (
                                                <div className='tab-npe-data shadow-lg'>
                                                    <p>NPE Country: <span>{npe.npe_country}</span></p>
                                                    <p>NPE Application Number: <span>{npe.npe_appno}</span></p>
                                                    <OverlayTrigger trigger={['hover', 'focus']}  placement="auto" overlay={renderPopover(npe.npe_dof)}><p>NPE Date of Filing: <span className={changeColorDates(npe.npe_dof)}>{npe.npe_dof}</span></p></OverlayTrigger>
                                                    <p>NPE Firm: <span>{npe.npe_fer_f}</span></p>
                                                    <p>NPE FER Issue Date: <span>{npe.npe_fer_i}</span></p>
                                                    <p>NPE FER Final Date: <span>{npe.npe_fer_f}</span></p>
                                                    <p>NPE Rule 161: <span>{npe.npe_ep_161}</span></p>
                                                    <p>NPE Granted / Rejected: <span>{npe.npe_ep_desc}</span></p>
                                                    <p>NPE claim to publication Date: <span>{npe.npe_ep_pub}</span></p>
                                                    <p>NPE Second Examination Report: <span>{npe.npe_ep_ser}</span></p>
                                                    <p>NPE translation of accepted Claim: <span>{npe.npe_ep_tac}</span></p>
                                                    <p>NPE Validation: <span>{npe.npe_ep_val}</span></p>
                                                    <p>NPE Grant Date: <span>{npe.npe_grant}</span></p>
                                                    <p>NPE Patent Number: <span>{npe.npe_patent}</span></p>
                                                    <p>NPE Issue Fee Date: <span>{npe.npe_if}</span></p>
                                                    <p>NPE Annuities Date: <span>{npe.npe_annuity}</span></p>
                                                    <p>NPE Request for Examination Date: <span>{npe.npe_rfe}</span></p>
                                                </div>
                                            ) : npe.npe_country === 'IN' ? (
                                                <div className='tab-npe-data shadow-lg'>
                                                    <p>NPE Country: <span>{npe.npe_country}</span></p>
                                                    <p>NPE Application Number: <span>{npe.npe_appno}</span></p>
                                                    <OverlayTrigger trigger={['hover', 'focus']}  placement="auto" overlay={renderPopover(npe.npe_dof)}><p>NPE Date of Filing: <span className={changeColorDates(npe.npe_dof)}>{npe.npe_dof}</span></p></OverlayTrigger>
                                                    <p>NPE Firm: <span>{npe.npe_fer_f}</span></p>
                                                    <p>NPE FER Issue Date: <span>{npe.npe_fer_i}</span></p>
                                                    <p>NPE FER Final Date: <span>{npe.npe_fer_f}</span></p>
                                                    <p>NPE Appeal Date: <span>{npe.npe_in_appeal}</span></p>
                                                    <p>NPE Hearing Date: <span>{npe.npe_in_hearing}</span></p>
                                                    <p>NPE Second Examination Report: <span>{npe.npe_in_ser}</span></p>
                                                    <p>NPE Grant Date: <span>{npe.npe_grant}</span></p>
                                                    <p>NPE Patent Number: <span>{npe.npe_patent}</span></p>
                                                    <p>NPE Issue Fee Date: <span>{npe.npe_if}</span></p>
                                                    <p>NPE Annuities Date: <span>{npe.npe_annuity}</span></p>
                                                    <p>NPE Request for Examination Date: <span>{npe.npe_rfe}</span></p>
                                                </div>
                                            ) : (
                                                <div className='tab-npe-data shadow-lg'>
                                                    <p>NPE Country: <span>{npe.npe_country}</span></p>
                                                    <p>NPE Application Number: <span>{npe.npe_appno}</span></p>
                                                    <OverlayTrigger trigger={['hover', 'focus']}  placement="auto" overlay={renderPopover(npe.npe_dof)}><p>NPE Date of Filing: <span className={changeColorDates(npe.npe_dof)}>{npe.npe_dof}</span></p></OverlayTrigger>
                                                    <p>NPE Firm: <span>{npe.npe_fer_f}</span></p>
                                                    <p>NPE FER Issue Date: <span>{npe.npe_fer_i}</span></p>
                                                    <p>NPE FER Final Date: <span>{npe.npe_fer_f}</span></p>
                                                    <OverlayTrigger trigger={['hover', 'focus']} placement="auto" overlay={renderPopover(npe.npe_grant)}><p>NPE Grant Date: <span className={changeColorDates(npe.npe_grant)}>{npe.npe_grant}</span></p></OverlayTrigger>
                                                    <p>NPE Patent Number: <span>{npe.npe_patent}</span></p>
                                                    <p>NPE Issue Fee Date: <span>{npe.npe_if}</span></p>
                                                    <p>NPE Annuities Date: <span>{npe.npe_annuity}</span></p>
                                                    <p>NPE Request for Examination Date: <span>{npe.npe_rfe}</span></p>
                                                </div>
                                            )
                                        }
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