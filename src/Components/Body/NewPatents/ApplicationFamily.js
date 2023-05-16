import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import { Accordion, Button, Modal } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const ApplicationFamily = () => {
    const [patentData, setPatentData] = useState({
        ref_no: "",
        prv: [{
            prv_appno: "",
            prv_dof: ""
        }],
        prv_notes: "",
        pct_dof: "",
        pct_appno: "",
        pct_das: "",
        pct_isr: "",
        pct_pubno: "",
        pct_18: "",
        pct_22_md: "",
        pct_30_31: "",
        pct_notes: "",
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
                npe_af_date: "",
                npe_af_grace: ""
            }],
            npe_rfe: "",
            npe_notes: ""
        }]
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSubmitModal, setShowSubmitDeleteModel] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [submissionError, setSubmissionError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [confirmCode, setConfirmCode] = useState('');
    const [errorMessage, setErrorMessage]  = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputs = (e) => {
        setPatentData({ ...patentData, [e.target.name]: e.target.value });
    }

    const handleChangePRV = (e, index) => {
        const { name, value } = e.target;
        setPatentData(prevState => {
            const newState = { ...prevState };
            newState.prv[index][name] = value;
            return newState;
        });
    }

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setPatentData(prevState => {
            const newState = { ...prevState };
            newState.npe[index][name] = value;
            return newState;
        });
    }

    const handleNPEOfficeDateChange = (e, NPEIndex, DateIndex) => {
        const npe = [...patentData.npe];
        const npe_oa = [...npe[NPEIndex].npe_oa];
        npe_oa[DateIndex][e.target.name] = e.target.value;
        npe[NPEIndex] = { ...npe[NPEIndex], npe_oa };
        setPatentData({...patentData, npe})
    }

    const handleNPEAnnuityDateChange = (e, NPEIndex, DateIndex) => {
        const npe = [...patentData.npe];
        const npe_af = [...npe[NPEIndex].npe_af];
        npe_af[DateIndex][e.target.name] = e.target.value;
        npe[NPEIndex] = { ...npe[NPEIndex], npe_af };
        setPatentData({...patentData, npe})
    }

    const handleAddNPEOfficeDate = (NPEIndex) => {
        const npe = [...patentData.npe];
        const npe_oa = [...npe[NPEIndex].npe_oa, {npe_oa_descp: "", npe_oa_date: ""}];
        npe[NPEIndex] = { ...npe[NPEIndex], npe_oa };
        setPatentData({ ...patentData, npe });
    }

    const handleRemoveNPEOfficeDate = (NPEIndex, DateIndex) => {
        const npe = [...patentData.npe];
        const npe_oa = [...npe[NPEIndex].npe_oa];
        npe_oa.splice(NPEIndex, 1);
        npe[NPEIndex] = { ...npe[NPEIndex], npe_oa };
        setPatentData({ ...patentData, npe });
    }

    const handleAddNPEAnnuityDate = (NPEIndex) => {
        const npe = [...patentData.npe];
        const npe_af = [...npe[NPEIndex].npe_af, {npe_af_descp: "", npe_af_date: ""}];
        npe[NPEIndex] = { ...npe[NPEIndex], npe_af };
        setPatentData({ ...patentData, npe });
    }

    const handleRemoveNPEAnnuityDate = (NPEIndex, DateIndex) => {
        const npe = [...patentData.npe];
        const npe_af = [...npe[NPEIndex].npe_af];
        npe_af.splice(NPEIndex, 1);
        npe[NPEIndex] = { ...npe[NPEIndex], npe_af };
        setPatentData({ ...patentData, npe });
    }

    const handleAddPRV = () => {
        const prv = [ ...patentData.prv, {
            prv_appno: "",
            prv_dof: ""
        }];
        setPatentData({ ...patentData, prv });
    } 

    const handleAddNPE = () => {
        const npe = [...patentData.npe, {
            npe_country: "",
            npe_appno: "",
            npe_dof: "",
            npe_firms: "",
            npe_oa: [{ npe_oa_descp: "", npe_oa_date: "" }],
            npe_grant_desc: "",
            npe_grant: "",
            npe_patent: "",
            npe_if: "",
            npe_af: [{ npe_af_descp: "", npe_af_date: "", npe_af_grace: "" }],
            npe_rfe: "",
            npe_notes: ""
        }];
        setPatentData({ ...patentData, npe });
    };

    const handleRemovePRV = (index) => {
        setPatentData((prevState) => {
            const newState = { ...prevState };
            newState.prv.splice(index, 1);
            return newState;
        });
    };

    const handleRemoveNPE = (index) => {
        setShowDeleteModal(true);
        setDeleteIndex(index);
    }

    const handleConfirmNPEDelete = () => {
        setPatentData((prevState) => {
          const newState = { ...prevState };
          newState.npe.splice(deleteIndex, 1);
          setShowDeleteModal(false);
          return newState;
        });
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setDeleteIndex(null);
    };

    const handleSubmit =  (e) => {
        e.preventDefault();
        setShowSubmitDeleteModel(true);
    }

    const handleSubmitModal = async () => {
        setSubmitting(true);
        setSubmissionError(null);
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/patent`, patentData, {
                headers: { 'confirmCode': confirmCode },
            });
            if(res.status === 201){
                console.log(res);
                setErrorMessage(res.data.message);
                alert("Application Family Submitted Successfully");
                navigate("/patentinfo/"+patentData.ref_no);
            }
        } catch (err) {
            console.error(err);
            setErrorMessage(err.response.data.error);
            setSubmissionError(err.response.data.message);
            setConfirmCode('');
        } finally {
            setSubmitting(false);
        }
    }

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleCloseSubmitModal= () => {
        setShowSubmitDeleteModel(false);
        setShowPassword(false);
    }

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return(
        <div>
            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to="/home" className='BC-Links'>Home</Link>
                <Link to="/newpatent" className='BC-Links'>New Patent</Link>
            </Breadcrumbs>

            <div className="patentForm">
                <div className="content">
                    <form className="form">
                        <div className="input-box-container">
                            <div className="input-box">
                                <span className="details">Reference Number</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter Reference Number"
                                    autoComplete="off"
                                    name="ref_no"
                                    value={patentData.ref_no}
                                    onChange={handleInputs}
                                />
                            </div>
                            <span className='prv'>Provisional Patent (PRV) Stage</span>
                            {
                                patentData.prv.map((prvData, prvIndex) => (
                                    <div key={prvIndex}>
                                        <div className="input-box">
                                            <span className="details">PRV Date of Filing</span>
                                            <input 
                                                type="date" 
                                                placeholder="Enter PRV Date of Filing"
                                                autoComplete="off"
                                                name="prv_dof"
                                                value={prvData.prv_dof}
                                                onChange={ (e) => handleChangePRV(e, prvIndex) }
                                            />
                                        </div>

                                        <div className="input-box">
                                            <span className="details">PRV Application Number</span>
                                            <input 
                                                type="text" 
                                                placeholder="Enter PRV Application Number"
                                                autoComplete="off"
                                                name="prv_appno"
                                                value={prvData.prv_appno}
                                                onChange={ (e) => handleChangePRV(e, prvIndex) }
                                            />
                                        </div>
                                        <Button size='lg' onClick={() => handleRemovePRV(prvIndex)} className= "remove-prv-date">Remove PRV</Button>
                                    </div>
                                ))
                            }

                            <Button size='lg' onClick={handleAddPRV} className= "add-prv-date">Add New PRV</Button>

                            <div className="pct-input-box">
                                <span className="details">PRV Notes</span>
                                <textarea 
                                    type="text" 
                                    placeholder="Enter PRV Notes"
                                    autoComplete="off"
                                    name="prv_notes"
                                    value={patentData.prv_notes}
                                    onChange={handleInputs}
                                />
                            </div>

                            <span className='pct'>Patent Corporation Treaty (PCT) Stage</span>
                            <div className="input-box">
                                <span className="details">PCT Date of Filing</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Date of Filing"
                                    autoComplete="off"
                                    name="pct_dof"
                                    value={patentData.pct_dof}
                                    onChange={handleInputs}
                                />
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
                                />
                            </div>

                            <div className="input-box">
                                <span className="details">PCT DAS Code</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter DAS Code"
                                    autoComplete="off"
                                    name="pct_das"
                                    value={patentData.pct_das}
                                    onChange={handleInputs}
                                />
                            </div>

                            <div className="input-box">
                                <span className="details">PCT ISR Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT ISR Date"
                                    autoComplete="off"
                                    name="pct_isr"
                                    value={patentData.pct_isr}
                                    onChange={handleInputs}
                                />
                            </div>

                            <div className="input-box">
                                <span className="details">PCT Publication Number</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter PCT Publication Number"
                                    autoComplete="off"
                                    name="pct_pubno"
                                    value={patentData.pct_pubno}
                                    onChange={handleInputs}
                                />
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
                                />
                            </div>

                            <div className="input-box">
                                <span className="details">PCT 22 Month Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Month Date"
                                    autoComplete="off"
                                    name="pct_22_md"
                                    value={patentData.pct_22_md}
                                    onChange={handleInputs}
                                />
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
                                />
                            </div>

                            <div className="pct-input-box">
                                <span className="details">PCT Notes</span>
                                <textarea 
                                    type="text" 
                                    placeholder="Enter PCT Notes"
                                    autoComplete="off"
                                    name="pct_notes"
                                    value={patentData.pct_notes}
                                    onChange={handleInputs}
                                />
                            </div>
                        </div>

                        <span className='npe'>National Phase Entry (NPE) Stage</span>
                        <Accordion alwaysOpen className='mb-4 update-accordion'>
                            {
                                patentData.npe.map((npeData, NPEIndex) => (
                                    <Accordion.Item eventKey={NPEIndex} key={NPEIndex}>
                                        <Accordion.Header>
                                            {npeData.npe_country ? (npeData.npe_country) : ("Click to add NPE Data")}    
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="input-box-container">
                                                <span className='npe-details'>Filing Stage: </span>
                                                <div className="input-box">
                                                    <span className='details'>NPE Country</span>
                                                    <select 
                                                        name="npe_country"
                                                        onChange={ (e) => handleChange(e, NPEIndex)}
                                                        value={npeData.npe_country ? npeData.npe_country : "Select Country"}
                                                    >
                                                        <option defaultValue disabled>Select Country</option>
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
                                                        <option value="US">United States (US)</option>
                                                    </select>
                                                </div>

                                                <div className="input-box">
                                                    <span className="details">NPE Firm</span>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Enter NPE Firm"
                                                        autoComplete="off"
                                                        name="npe_firms"
                                                        value={npeData.npe_firms}
                                                        onChange={ (e) => handleChange(e, NPEIndex)}
                                                    />
                                                </div>

                                                <div className="input-box">
                                                    <span className="details">NPE Application Number</span>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Enter NPE Application Number"
                                                        autoComplete="off"
                                                        name="npe_appno"
                                                        value={npeData.npe_appno}
                                                        onChange={ (e) => handleChange(e, NPEIndex)}
                                                    />
                                                </div>

                                                <div className="input-box">
                                                    <span className="details">NPE Date of Filing</span>
                                                    <input 
                                                        type="date" 
                                                        placeholder="Enter NPE Date of Filing"
                                                        autoComplete="off"
                                                        name="npe_dof"
                                                        value={npeData.npe_dof}
                                                        onChange={ (e) => handleChange(e, NPEIndex)}
                                                    />
                                                </div>

                                                <div className="input-box">
                                                    <span className="details">NPE Request for Examination Date</span>
                                                    <input 
                                                        type="date" 
                                                        placeholder="Enter NPE Request for Examination Date"
                                                        autoComplete="off"
                                                        name="npe_rfe"
                                                        value={npeData.npe_rfe}
                                                        onChange={ (e) => handleChange(e, NPEIndex)}
                                                    />
                                                </div>

                                                <div>
                                                    <span className='npe-details'>Examination Stage: </span>
                                                    {
                                                        npeData.npe_oa.map((OADate, OAIndex) => (
                                                            <div key={OAIndex}>
                                                                <div className="input-box">
                                                                    <span className="details">NPE Examination Type</span>
                                                                    <input 
                                                                        type="text" 
                                                                        placeholder="Enter NPE Examination Type"
                                                                        autoComplete="off"
                                                                        name="npe_oa_descp"
                                                                        value={OADate.npe_oa_descp}
                                                                        onChange={ (e) => handleNPEOfficeDateChange(e, NPEIndex, OAIndex)}
                                                                    />
                                                                </div>
                                                                <div className="input-box">
                                                                    <span className="details">NPE Examination Date</span>
                                                                    <input 
                                                                        type="date" 
                                                                        placeholder="Enter NPE Examination Date"
                                                                        autoComplete="off"
                                                                        name="npe_oa_date"
                                                                        value={OADate.npe_oa_date}
                                                                        onChange={ (e) => handleNPEOfficeDateChange(e, NPEIndex, OAIndex)}
                                                                    />
                                                                </div>
                                                                <Button size='sm' className='remove-date' onClick={() => handleRemoveNPEOfficeDate(NPEIndex, OAIndex)}>Remove Office Action</Button>
                                                            </div>
                                                        ))
                                                    }

                                                    <Button size='sm' className='add-date' onClick={() => handleAddNPEOfficeDate(NPEIndex)}>Add Office Action</Button>
                                                </div>

                                                <div className="input-box">
                                                    <span className="details">NPE Status</span>
                                                    <select
                                                        name="npe_grant_desc"
                                                        onChange={ (e) => handleChange(e, NPEIndex)}
                                                    >
                                                        <option value="NA">Select NPE Status</option>
                                                        <option value="1">Granted</option>
                                                        <option value="2">Under Examination</option>
                                                        <option value="0">Dead</option>
                                                    </select>
                                                </div>

                                                <div className="input-box">
                                                    <span className="details">NPE Grant Date</span>
                                                    <input 
                                                        type="date" 
                                                        placeholder="NPE Grant Date"
                                                        autoComplete="off"
                                                        name="npe_grant"
                                                        value={npeData.npe_grant}
                                                        onChange={ (e) => handleChange(e, NPEIndex)}
                                                    />
                                                </div>

                                                <div className="input-box">
                                                    <span className="details">NPE Patent Number</span>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Enter NPE Patent Number"
                                                        autoComplete="off"
                                                        name="npe_patent"
                                                        value={npeData.npe_patent}
                                                        onChange={ (e) => handleChange(e, NPEIndex)}
                                                    />
                                                </div>

                                                <div className="input-box">
                                                    <span className="details">NPE Issue Fee</span>
                                                    <input 
                                                        type="date" 
                                                        placeholder="NPE Issue Fee"
                                                        autoComplete="off"
                                                        name="npe_if"
                                                        value={npeData.npe_if}
                                                        onChange={ (e) => handleChange(e, NPEIndex)}
                                                    />
                                                </div>
                                                <div>
                                                    <span className='npe-details'>Annuity Stage: </span>
                                                    {
                                                        npeData.npe_af.map((OFDate, OFIndex) => (
                                                            <div key={OFIndex}>
                                                                <div className="input-box">
                                                                    <span className="details">NPE Annuity Type</span>
                                                                    <input 
                                                                        type="text" 
                                                                        placeholder="Enter NPE Annuity Type"
                                                                        autoComplete="off"
                                                                        name="npe_af_descp"
                                                                        value={OFDate.npe_af_descp}
                                                                        onChange={ (e) => handleNPEAnnuityDateChange(e, NPEIndex, OFIndex)}
                                                                    />
                                                                </div>
                                                                <div className="input-box">
                                                                    <span className="details">NPE Annuity Date</span>
                                                                    <input 
                                                                        type="date" 
                                                                        placeholder="Enter NPE Annuity Date"
                                                                        autoComplete="off"
                                                                        name="npe_af_date"
                                                                        value={OFDate.npe_af_date}
                                                                        onChange={ (e) => handleNPEAnnuityDateChange(e, NPEIndex, OFIndex)}
                                                                    />
                                                                </div>
                                                                <div className="input-box">
                                                                    <span className="details">NPE Grace Period</span>
                                                                    <input 
                                                                        type="date" 
                                                                        placeholder="NPE Grace Period"
                                                                        autoComplete="off"
                                                                        name="npe_af_grace"
                                                                        value={OFDate.npe_af_grace}
                                                                        onChange={ (e) => handleNPEAnnuityDateChange(e, NPEIndex, OFIndex)}
                                                                    />
                                                                </div>
                                                                <Button size='sm' className="remove-date" onClick={() => handleRemoveNPEAnnuityDate(NPEIndex, OFIndex)}>Remove Annuity Date</Button>
                                                            </div>
                                                        ))
                                                    }

                                                    <Button size='sm' className='add-date' onClick={() => handleAddNPEAnnuityDate(NPEIndex)}>Add Annuity Date</Button>
                                                </div>

                                                <div className="input-box">
                                                    <span className="details">NPE Notes</span>
                                                    <textarea 
                                                        type="date" 
                                                        placeholder="Enter NPE Notes"
                                                        autoComplete="off"
                                                        name="npe_notes"
                                                        value={npeData.npe_notes}
                                                        onChange={ (e) => handleChange(e, NPEIndex)}
                                                    />
                                                </div>

                                                <Button size='lg' onClick={() => handleRemoveNPE(NPEIndex)} className= "remove-npe-form">Remove NPE</Button>
                                                
                                                <Modal show={showDeleteModal} onHide={handleCancelDelete} backdrop="static" keyboard={false} centered>
                                                    <Modal.Header>
                                                        <Modal.Title>Confirm NPE Deletion</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        Are you sure you want to delete this NPE Data?
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button className='close-button'  onClick={handleCancelDelete}>Cancel</Button>
                                                        <Button className='signout-modal-button' onClick={handleConfirmNPEDelete}>Delete</Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))
                            }
                        </Accordion>

                        <Button size="lg" onClick={handleAddNPE} className="add-npe">Add New NPE</Button>

                        <div className='button'>
                            <input
                                type="submit"
                                name="submit patent"
                                value={submitting ? 'Submitting Application Family...' : 'Submit Application Family'}
                                onClick={handleSubmit}
                            />
                        </div>

                        {submissionError && <p className='error-message'>{submissionError}</p>}

                        <Modal show={showSubmitModal} onHide={handleCloseSubmitModal} size="lg" backdrop="static" keyboard={false} centered>
                            <Modal.Header>
                                <Modal.Title className='Modal-title-submit-form'>Confirm Application Family Data Submission</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>Are you sure you want to submit this Application? Please verify whether all the inputs are correct if so Please enter the confirmation code to submit the Application Family</p>
                                <div className='delete-input-box'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter confirmation code"
                                        value={confirmCode}
                                        onChange={ (e) => setConfirmCode(e.target.value) }
                                    />
                                    <div className="eye-icon" onClick={toggleShowPassword}>
                                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                                    </div>
                                </div>
                                {errorMessage && ( <p className="text-danger mt-3">{errorMessage}</p> )}
                                <span className='forgot-code' onClick={() => alert("Please contact your Admin")}>Forgot Confirmation Code?</span>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button className='signout-modal-button'  onClick={handleCloseSubmitModal}>Cancel</Button>
                                <Button  className='close-button' onClick={handleSubmitModal} disabled={!confirmCode}>Submit</Button>
                            </Modal.Footer>
                        </Modal>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ApplicationFamily;