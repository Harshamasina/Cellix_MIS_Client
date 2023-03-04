import React, { useState } from 'react';
import axios from 'axios';
import { Parallax } from 'react-parallax';
import { Button, Modal } from "react-bootstrap";
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';

const PatentLifeCycleForm = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/analsys.jpg";
    const [patentData, setPatentData] = useState({
        ref_no: "",
        prv_dof: "",
        prv_appno: "",
        pct_dof: "",
        pct_appno: "",
        pct_isa: "",
        pct_18: "",
        pct_22_md: "",
        pct_30_31: "",
        pct_dl: "",
        npe: [{
            npe_country: "",
            npe_appno: "",
            npe_dof: "",
            npe_firms: "",
            npe_oa: [{
                npe_oa_descp: "",
                npe_oa_date: ""
            }],
            npe_grant_desc: "",
            npe_grant: "",
            npe_patent: "",
            npe_if: "",
            npe_af: [{
                npe_af_descp: "",
                npe_af_date: ""
            }],
            npe_rfe: "",
            npe_notes: ""
        }]
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [NPEModal, setNPEModal] = useState(false);
    const [removeNPEIndex, setRemoveNPEIndex] = useState(null);
    const [submitModal, setSubmitModal] = useState(false);

    const handleInputs = (e, index) => {
        const { name, value } = e.target;
        const newPatentData = { ...patentData };
        if( name === 'npe_country' || name === 'npe_appno' || name === 'npe_dof' || name === 'npe_firms' || 
            name === 'npe_grant' || name === 'npe_patent' || name === 'npe_if' || name === 'npe_annuity' || name === 'npe_rfe' )
        {
            newPatentData.npe[index][name] = value;
        } else if ( name === 'npe_oa_descp' || name === 'npe_oa_date') 
        {
            newPatentData.npe.npe_oa[index][name] = value;
        } else if ( name === 'npe_af_descp' || name === 'npe_af_date') 
        {
            newPatentData.npe.npe_af[index][name] = value;
        } else 
        {
            newPatentData[name] = value;
        }
        setPatentData(newPatentData);
    }

    const handleAddNPE = () => {
        const newPatentData = { ...patentData };
        newPatentData.npe.push({
            npe_country: "",
            npe_appno: "",
            npe_dof: "",
            npe_grant: "",
            npe_patent: "",
            npe_if: "",
            npe_annuity: "",
            npe_rfe: ""
        });
        setPatentData(newPatentData);
    }

    const handleAddDate = () => {
        const newPatentData = { ...patentData };
        newPatentData.npe.npe_oa.push({
            npe_oa_descp: "",
            npe_oa_date: ""
        });
    }

    const handleRemoveNPE = (index) => {
        setRemoveNPEIndex(index);
        setNPEModal(true);
    }

    const handleRemoveNPEModal = () => {
        const newPatentData = { ...patentData };
        newPatentData.npe.splice(removeNPEIndex, 1);
        setPatentData(newPatentData);
        setNPEModal(false);
    }

    const handleRemoveDate = (index) => {
        const newPatentData = { ...patentData.npe };
        newPatentData.npe.npe_oa.splice(index, 1);
        setPatentData(newPatentData.npe);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitModal(true);
    }

    const handleSubmitModal = async () => {
        setError(null);
        setIsLoading(true);
        try{
            const res = await axios.post('https://misbackend.cellixbio.info/api/patent', patentData);
            console.log(res);
            setIsLoading(false);
            window.alert("Successfully Posted Patent");
        } catch (err) {
            setError(err);
            console.error(err);
            setIsLoading(false);
        }
    }

    const handleRemoveCancelled = () => {
        setNPEModal(false);
    }

    const handleCloseSubmitModal= () => {
        setSubmitModal(false);
    }
    console.log(patentData);
    return(
        <div>
            <Parallax bgImage={ img } strength={200} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>MIS Form</h1>
                        </div>
                    </div>
                </div>
            </Parallax>
            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to="/home" className='BC-Links'>Home</Link>
                <Link to="/newpatent" className='BC-Links'>New Patent</Link>
                <Link to="/newentry" className='BC-Links'>New Reference Number Form</Link>
            </Breadcrumbs>
            <div className="patentForm">
                <div className="content">
                    <form className="form">
                        <div className="patent-details">
                            <div className="input-box">
                                <span className="details">Reference Number</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter Reference Number"
                                    autoComplete="off"
                                    name="ref_no"
                                    value={patentData.ref_no}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PRV Date of Filing</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PRV Date of Filing"
                                    autoComplete="off"
                                    name="prv_dof"
                                    value={patentData.prv_dof}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PRV Application Number</span>
                                <input 
                                    type="text" 
                                    placeholder="PRV Application Number"
                                    autoComplete="off"
                                    name="prv_appno"
                                    value={patentData.prv_appno}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT Date of Filing</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Date of Filing"
                                    autoComplete="off"
                                    name="pct_dof"
                                    value={patentData.pct_dof}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT Number</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter PCT Number"
                                    autoComplete="off"
                                    name="pct_appno"
                                    value={patentData.pct_appno}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT ISA Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT ISA Date"
                                    autoComplete="off"
                                    name="pct_isa"
                                    value={patentData.pct_isa}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT Publication Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Publication Date"
                                    autoComplete="off"
                                    name="pct_18"
                                    value={patentData.pct_18}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT 22 Month Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Month Date"
                                    autoComplete="off"
                                    name="pct_22_md"
                                    value={patentData.pct_22_24}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT 30/31 Date</span>
                                <input 
                                    type="date" 
                                    placeholder="PCT 30/31 Date"
                                    autoComplete="off"
                                    name="pct_30_31"
                                    value={patentData.pct_30_31}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            
                            <div className="input-box">
                                <span className="details">PCT Deadline</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Deadline"
                                    autoComplete="off"
                                    name="pct_dl"
                                    value={patentData.prv_dl}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>
                        </div>
                        {
                            patentData.npe.map((npeData, i) => (
                                <div className='patent-details' key={i}>
                                    <div className="input-box">
                                        <span className="details">NPE Country</span>
                                        <select 
                                            name="npe_country"
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                            <option defaultValue disabled>Select Country</option>
                                            <option value="US">United States (US)</option>
                                            <option value="US (DIV)">United States (US DIV)</option>
                                            <option value="AU">Australia (AU)</option>
                                            <option value="BR">Brazil (BR)</option>
                                            <option value="CA">Canada (CA)</option>
                                            <option value="CN">China (CN)</option>
                                            <option value="DK">Denmark (DK)</option>
                                            <option value="EP">Europe (EP)</option>
                                            <option value="IN">India (IN)</option>
                                            <option value="IL">Israel (IL)</option>
                                            <option value="JP">Japan (JP)</option>
                                            <option value="MX">Mexico (MX)</option>
                                            <option value="NZ">New Zealand (NZ)</option>
                                            <option value="RU">Russia (RU)</option>
                                            <option value="SG">Singapore (SG)</option>
                                            <option value="ZA">South Africa (ZA)</option>
                                            <option value="KR">South Korea (KR)</option>
                                            <option value="ES">Spain (ES)</option>
                                        </select>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Application Number</span>
                                        <input 
                                            type="text" 
                                            placeholder="Enter NPE Application Number"
                                            autoComplete="off"
                                            name="npe_appno"
                                            value={npeData.npe_appno}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Date of Filing</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Date of Filing"
                                            autoComplete="off"
                                            name="npe_dof"
                                            value={npeData.npe_dof}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Firms</span>
                                        <input 
                                            type="text" 
                                            placeholder="Enter NPE Firms"
                                            autoComplete="off"
                                            name="npe_firms"
                                            value={npeData.npe_firms}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    {
                                        npeData.npe_oa && npeData.npe_oa.map((npeOAData, i) => (
                                            <div className='patent-details' key={i}>
                                                <div className="input-box">
                                                    <span className="details">NPE Examination Type</span>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Enter NPE Firms"
                                                        autoComplete="off"
                                                        name="npe_firms"
                                                        value={npeOAData.npe_oa_descp}
                                                        onChange={ (e) => handleInputs(e,i)}
                                                    >
                                                    </input>
                                                </div>

                                                <div className="input-box">
                                                    <span className="details">NPE Examination Date</span>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Enter NPE Firms"
                                                        autoComplete="off"
                                                        name="npe_firms"
                                                        value={npeOAData.npe_oa_date}
                                                        onChange={ (e) => handleInputs(e,i)}
                                                    >
                                                    </input>
                                                </div>
                                                { i > 0 && (
                                                    <AiOutlineMinus onClick={() => handleRemoveDate(i)} />
                                                )}
                                            </div>
                                        ))
                                    }
                                    <AiOutlinePlus onClick={handleAddDate} />
                                    <div className="input-box">
                                        <span className="details">NPE Grant Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="NPE Grant Date"
                                            autoComplete="off"
                                            name="npe_grant"
                                            value={npeData.npe_grant}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Patent Number</span>
                                        <input 
                                            type="text" 
                                            placeholder="Enter NPE Patent Number"
                                            autoComplete="off"
                                            name="npe_patent"
                                            value={npeData.npe_patent}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Issue Fee Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Issue Fee Date"
                                            autoComplete="off"
                                            name="npe_if"
                                            value={npeData.npe_if}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Annuities Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Annuities Date"
                                            autoComplete="off"
                                            name="npe_annuity"
                                            value={npeData.npe_annuity}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Request for Examination Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Request for Examination Date"
                                            autoComplete="off"
                                            name="npe_rfe"
                                            value={npeData.npe_rfe}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>
                                    { i > 0 && (
                                        <>
                                            <Button className=" m-lg-3 remove-npe" onClick={() => handleRemoveNPE(i)}>Remove NPE</Button>
                                            <Modal show={NPEModal} onHide={handleRemoveCancelled}>
                                                <Modal.Header>
                                                    <Modal.Title>Remove NPE Data</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Are you sure you want to remove this NPE Data?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button className='close-button' onClick={handleRemoveCancelled}>Cancel</Button>
                                                    <Button className='signout-modal-button' onClick={handleRemoveNPEModal}>Yes</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </>
                                    )}
                                </div>
                            ))
                        }
                        <Button className="add-npe" onClick={handleAddNPE}>Add NPE</Button>
                        <div className='button'>
                           <input type="submit" name="submit patent" value={isLoading ? "submitting Patent" : "Submit Patent"} onClick={handleSubmit}></input>
                        </div>
                        <Modal show={submitModal} onHide={handleRemoveCancelled}>
                            <Modal.Header >
                                <Modal.Title className='Modal-title-pct'>Confirm Submission</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to submit the form? Please verify all data inserted correctly</Modal.Body>
                            <Modal.Footer>
                                <Button className='signout-modal-button' onClick={handleCloseSubmitModal}>Cancel</Button>
                                <Button className = "close-button" onClick={handleSubmitModal}>Submit</Button>
                            </Modal.Footer>
                        </Modal>
                        {error && <p className='error-message'>There was an error: {error.message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PatentLifeCycleForm;