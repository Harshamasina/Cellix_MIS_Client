import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { Parallax } from 'react-parallax';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';

const PatentInfo = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/lock.jpg";
    const {ref} = useParams();
    const [patent, setPatent] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const patentData = await axios.get(`/api/getpatent/${ref}`);
            setPatent(patentData.data);
        }
        fetchData();
    }, [ref]);
    console.log(patent);
    return(
        <div>
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg" blur={3}>
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>{patent.ref_no}</h1>
                        </div>
                        <Link className='patentinfo-link'>Edit {patent.ref_no}</Link>
                    </div>
                </div>
            </Parallax>
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
                        <p>PCT ISA Date: <span>{patent.pct_}</span></p>
                        <p>PCT Publication Date: <span>{patent.pct_18}</span></p>
                        <p>PCT 22 Month Date: <span>{patent.pct_22_md}</span></p>
                        <p>PCT 30/31 Date: <span>{patent.pct_30_31}</span></p>
                        <p>PCT Deadline: <span>{patent.pct_dl}</span></p>
                    </div>
                </Tab>
                <Tab eventKey="NPE" title="Non Practicing Entity Data (NPE) Data" tabClassName='tab-item'>
                    <Accordion defaultActiveKey="0" flush className='mb-4'>
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
                                                    <p>NPE Date of Filing: <span>{npe.npe_dof}</span></p>
                                                    <p>NPE Firm: <span>{npe.npe_fer_f}</span></p>
                                                    <p>NPE FER Issue Date: <span>{npe.npe_fer_i}</span></p>
                                                    <p>NPE FER Final Date: <span>{npe.npe_fer_f}</span></p>
                                                    <p>NPE First Office Action Date (Only for US): <span>{npe.npe_us_foa}</span></p>
                                                    <p>NPE Second Office Action Date (Only for US): <span>{npe.npe_us_soa}</span></p>
                                                    <p>NPE request for Continuation (Only for US): <span>{npe.npe_us_rc}</span></p>
                                                    <p>NPE Response to Examination Report (Only for US): <span>{npe.npe_us_rr}</span></p>
                                                    <p>NPE Final Action (Only for US): <span>{npe.npe_us_fa}</span></p>
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
                                                    <p>NPE Date of Filing: <span>{npe.npe_dof}</span></p>
                                                    <p>NPE Firm: <span>{npe.npe_fer_f}</span></p>
                                                    <p>NPE FER Issue Date: <span>{npe.npe_fer_i}</span></p>
                                                    <p>NPE FER Final Date: <span>{npe.npe_fer_f}</span></p>
                                                    <p>NPE Rule 161: <span>{npe.npe_ep_161}</span></p>
                                                    <p>NPE Granted / Rejected: <span>{npe.npe_grant}</span></p>
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
                                                    <p>NPE Date of Filing: <span>{npe.npe_dof}</span></p>
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
                                                    <p>NPE Date of Filing: <span>{npe.npe_dof}</span></p>
                                                    <p>NPE Firm: <span>{npe.npe_fer_f}</span></p>
                                                    <p>NPE FER Issue Date: <span>{npe.npe_fer_i}</span></p>
                                                    <p>NPE FER Final Date: <span>{npe.npe_fer_f}</span></p>
                                                    <p>NPE Grant Date: <span>{npe.npe_grant}</span></p>
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