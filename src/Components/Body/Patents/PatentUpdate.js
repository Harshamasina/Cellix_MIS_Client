import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Parallax } from 'react-parallax';
import { useParams } from 'react-router';
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import { Button, Modal } from 'react-bootstrap';

const PatentUpdate = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/checklist+1.jpg";
    const { id } = useParams();
    const [patent, setPatent] = useState({
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
        npe: [
            {
                npe_country: "",
                npe_country_div: "",
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
            }
        ]
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showNPEModal, setShowNPEModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [showSubmitModal, setShowSubmitDeleteModel] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/getpatentid/${id}`);
                setPatent(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleInputs = (e, NPEIndex, AFIndex, OAIndex) => {
        const { name, value } = e.target;
        if (OAIndex !== undefined) {
          setPatent(prevState => {
            const updatedNPE = [...prevState.npe];
            updatedNPE[NPEIndex].npe_oa[OAIndex] = {
              ...updatedNPE[NPEIndex].npe_oa[OAIndex],
              [name]: value
            };
            return {
              ...prevState,
              npe: updatedNPE
            };
          });
        } else if (AFIndex !== undefined) {
          setPatent(prevState => {
            const updatedNPE = [...prevState.npe];
            updatedNPE[NPEIndex].npe_af[AFIndex] = {
              ...updatedNPE[NPEIndex].npe_af[AFIndex],
              [name]: value
            };
            return {
              ...prevState,
              npe: updatedNPE
            };
          });
        } else if (NPEIndex !== undefined) {
          setPatent(prevState => {
            const updatedNPE = [...prevState.npe];
            updatedNPE[NPEIndex] = {
              ...updatedNPE[NPEIndex],
              [name]: value
            };
            return {
              ...prevState,
              npe: updatedNPE
            };
          });
        } else {
          setPatent(prevState => ({
            ...prevState,
            [name]: value
          }));
        }
    };

    const handleAddNPE = () => {
        setPatent(prevState => ({
            ...prevState,
            npe: [...prevState.npe, {
                npe_country: "",
                npe_country_div: "",
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
        }));
    };

    const handleRemoveNPE = (index) => {
        setShowNPEModal(true);
        setDeleteIndex(index);
    }

    const handleConfirmNPERemove = () => {
        setShowNPEModal(false);
        setPatent(prevState => {
          const updatedNPE = [...prevState.npe];
          updatedNPE.splice(deleteIndex, 1);
          return {
            ...prevState,
            npe: updatedNPE
          };
        });
    };

    const handleCancelDelete = () => {
        setShowNPEModal(false);
        setDeleteIndex(null);
    };

    const handleAddOA = (NPEIndex) => {
        setPatent(prevState => {
          const updatedNPE = [...prevState.npe];
          updatedNPE[NPEIndex].npe_oa = [...updatedNPE[NPEIndex].npe_oa, {
            npe_oa_descp: "",
            npe_oa_date: ""
          }];
          return {
            ...prevState,
            npe: updatedNPE
          };
        });
    };

    const handleRemoveOA = (NPEIndex, OAIndex) => {
        setPatent(prevState => {
          const updatedNPE = [...prevState.npe];
          updatedNPE[NPEIndex].npe_oa.splice(OAIndex, 1);
          return {
            ...prevState,
            npe: updatedNPE
          };
        });
    };

    const handleAddAF = (NPEIndex) => {
        setPatent(prevState => {
          const updatedNPE = [...prevState.npe];
          updatedNPE[NPEIndex].npe_af = [...updatedNPE[NPEIndex].npe_af, {
            npe_af_descp: "",
            npe_af_date: ""
          }];
          return {
            ...prevState,
            npe: updatedNPE
          };
        });
    };

    const handleRemoveAF = (NPEIndex, AFIndex) => {
        setPatent(prevState => {
          const updatedNPE = [...prevState.npe];
          updatedNPE[NPEIndex].npe_af.splice(AFIndex, 1);
          return {
            ...prevState,
            npe: updatedNPE
          };
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setShowSubmitDeleteModel(true);
    }

    const handleUpdateModal = async () => {
        setSubmitting(true);
        try{
            const res = await axios.patch(`http://localhost:5000/api/updatepatentid/${id}` ,patent);
            console.log(res);
            alert("Application Family Updated Successfully");
            window.location.reload();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    const handleCloseSubmitModal= () => {
        setShowSubmitDeleteModel(false);
    }

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

    return(
        <div>
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1> { patent && patent.ref_no } Update</h1>
                        </div>
                    </div>
                </div>
            </Parallax>
            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to="/home" className='BC-Links'>Home</Link>
                <Link to="/patents" className='BC-Links'>Patents Dashboard</Link>
                <Link to={"/patentinfo/"+patent.ref_no} className='BC-Links'>{patent.ref_no}</Link>
                <Link to={"/patentupdate/"+patent._id} className='BC-Links'>{patent.ref_no} Update</Link>
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
                                    value={patent.ref_no}
                                    onChange={handleInputs}
                                />
                            </div>

                            <div className="input-box">
                                <span className="details">PRV Date of Filing</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PRV Date of Filing"
                                    autoComplete="off"
                                    name="prv_dof"
                                    value={patent.prv_dof}
                                    onChange={handleInputs}
                                />
                            </div>

                            <div className="input-box">
                                <span className="details">PRV Application Number</span>
                                <input 
                                    type="text" 
                                    placeholder="PRV Application Number"
                                    autoComplete="off"
                                    name="prv_appno"
                                    value={patent.prv_appno}
                                    onChange={handleInputs}
                                />
                            </div>

                            <div className="input-box">
                                <span className="details">PCT Date of Filing</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Date of Filing"
                                    autoComplete="off"
                                    name="pct_dof"
                                    value={patent.pct_dof}
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
                                    value={patent.pct_appno}
                                    onChange={handleInputs}
                                />
                            </div>

                            <div className="input-box">
                                <span className="details">PCT ISA Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT ISA Date"
                                    autoComplete="off"
                                    name="pct_isa"
                                    value={patent.pct_isa}
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
                                    value={patent.pct_18}
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
                                    value={patent.pct_22_md}
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
                                    value={patent.pct_30_31}
                                    onChange={handleInputs}
                                />
                            </div>

                            
                            <div className="input-box">
                                <span className="details">PCT Deadline</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Deadline"
                                    autoComplete="off"
                                    name="pct_dl"
                                    value={patent.pct_dl}
                                    onChange={handleInputs}
                                />
                            </div>
                        </div>
                        {
                            patent.npe.map((npe, NPEIndex) => (
                                <div key={NPEIndex} className="input-box-container">
                                    <h3>Filing Stage</h3>
                                    <div className="input-box">
                                        <span className='details'>NPE Country</span>
                                        <select 
                                            name="npe_country"
                                            onChange={ (e) => handleInputs(e, NPEIndex)}
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
                                        <span className="details">NPE Country with (Divisional Number)</span>
                                        <input 
                                            type="text" 
                                            placeholder="Enter NPE Country with (Divisional Number)"
                                            autoComplete="off"
                                            name="npe_country_div"
                                            value={npe.npe_country_div}
                                            onChange={ (e) => handleInputs(e, NPEIndex)}
                                        />
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Application Number</span>
                                        <input 
                                            type="text" 
                                            placeholder="Enter NPE Application Number"
                                            autoComplete="off"
                                            name="npe_appno"
                                            value={npe.npe_appno}
                                            onChange={ (e) => handleInputs(e, NPEIndex)}
                                        />
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Date of Filing</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Date of Filing"
                                            autoComplete="off"
                                            name="npe_dof"
                                            value={npe.npe_dof}
                                            onChange={ (e) => handleInputs(e, NPEIndex)}
                                        />
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Firms</span>
                                        <input 
                                            type="text" 
                                            placeholder="Enter NPE Firms"
                                            autoComplete="off"
                                            name="npe_firms"
                                            value={npe.npe_firms}
                                            onChange={ (e) => handleInputs(e, NPEIndex)}
                                        />
                                    </div>
                                    <h3>Examination Stage</h3>
                                    {
                                        npe.npe_oa.map((oa, oaIndex) => (
                                            <div key={oaIndex}>
                                                <div className="input-box">
                                                    <span className="details">NPE Examination Type</span>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Enter NPE Examination Type"
                                                        autoComplete="off"
                                                        name="npe_oa_descp"
                                                        value={oa.npe_oa_descp}
                                                        onChange={ (e) => handleInputs(e, NPEIndex, undefined ,oaIndex)}
                                                    />
                                                </div>
                                                <div className="input-box">
                                                    <span className="details">NPE Examination Date</span>
                                                    <input 
                                                        type="date" 
                                                        placeholder="Enter NPE Examination Date"
                                                        autoComplete="off"
                                                        name="npe_oa_date"
                                                        value={oa.npe_oa_date}
                                                        onChange={ (e) => handleInputs(e, NPEIndex, undefined ,oaIndex)}
                                                    />
                                                </div>
                                                <Button size='sm' className='remove-date' onClick={() => handleRemoveOA(NPEIndex, oaIndex)}>Remove Office Action</Button>
                                            </div>
                                        ))
                                    }
                                    <Button size='sm' className='add-date' onClick={() => handleAddOA(NPEIndex)}>Add Office Action</Button>
                                    <div className="input-box">
                                        <span className="details">NPE Granted / Rejected</span>
                                        <select
                                            name="npe_grant_desc"
                                            onChange={ (e) => handleInputs(e, NPEIndex)}
                                        >
                                            <option value="NA">Select NPE Status</option>
                                            <option value="1">Granted</option>
                                            <option value="0">Rejected</option>
                                        </select>
                                    </div>
                                    <div className="input-box">
                                        <span className="details">NPE Grant Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="NPE Grant Date"
                                            autoComplete="off"
                                            name="npe_grant"
                                            value={npe.npe_grant}
                                            onChange={ (e) => handleInputs(e, NPEIndex)}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">NPE Issue Fee</span>
                                        <input 
                                            type="date" 
                                            placeholder="NPE Issue Fee"
                                            autoComplete="off"
                                            name="npe_if"
                                            value={npe.npe_if}
                                            onChange={ (e) => handleInputs(e, NPEIndex)}
                                        />
                                    </div>
                                    <h3>Annuity Stage</h3>
                                    {
                                        npe.npe_af.map((af, afIndex) => (
                                            <div key={afIndex}>
                                                <div className="input-box">
                                                    <span className="details">NPE Annuity Type</span>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Enter NPE Annuity Type"
                                                        autoComplete="off"
                                                        name="npe_af_descp"
                                                        value={af.npe_af_descp}
                                                        onChange={ (e) => handleInputs(e, NPEIndex, afIndex)}
                                                    />
                                                </div>
                                                <div className="input-box">
                                                    <span className="details">NPE NPE Annuity Date</span>
                                                    <input 
                                                        type="date" 
                                                        placeholder="Enter NPE Annuity Date"
                                                        autoComplete="off"
                                                        name="npe_af_date"
                                                        value={af.npe_af_date}
                                                        onChange={ (e) => handleInputs(e, NPEIndex, afIndex)}
                                                    />
                                                </div>
                                                <Button size='sm' className='remove-date' onClick={() => handleRemoveAF(NPEIndex, afIndex)}>Remove Annuity Fee</Button>
                                            </div>
                                        ))
                                    }
                                    <Button size='sm' className='add-date' onClick={() => handleAddAF(NPEIndex)}>Add Annuity Fee</Button>
                                    <div className="input-box">
                                        <span className="details">NPE Patent Number</span>
                                        <input 
                                            type="text" 
                                            placeholder="Enter NPE Patent Number"
                                            autoComplete="off"
                                            name="npe_patent"
                                            value={npe.npe_patent}
                                            onChange={ (e) => handleInputs(e, NPEIndex)}
                                        />
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Request for Examination Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Request for Examination Date"
                                            autoComplete="off"
                                            name="npe_rfe"
                                            value={npe.npe_rfe}
                                            onChange={ (e) => handleInputs(e, NPEIndex)}
                                        />
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Notes</span>
                                        <textarea 
                                            type="date" 
                                            placeholder="Enter NPE Notes"
                                            autoComplete="off"
                                            name="npe_notes"
                                            value={npe.npe_notes}
                                            onChange={ (e) => handleInputs(e, NPEIndex)}
                                        />
                                    </div>
                                    <Button size='lg' onClick={() => handleRemoveNPE(NPEIndex)} className= "remove-npe-form">Remove NPE</Button>
                                    <Modal show={showNPEModal} onHide={handleCancelDelete} backdrop="static" keyboard={false}>
                                        <Modal.Header><Modal.Title>Confirm NPE Deletion</Modal.Title></Modal.Header>
                                        <Modal.Body>Are you sure you want to delete this NPE Data?</Modal.Body>
                                        <Modal.Footer>
                                            <Button className='close-button'  onClick={handleCancelDelete}>Cancel</Button>
                                            <Button className='signout-modal-button' onClick={handleConfirmNPERemove}>Delete</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            ))
                        }
                        <Button size="lg" onClick={handleAddNPE} className="add-npe">Add New NPE</Button>
                        <div className='button'>
                            <input
                                type="submit"
                                name="Update patent"
                                value={submitting ? 'Updating Application Family...' : 'Update Application Family'}
                                onClick={handleUpdate}
                            />
                        </div>
                        <Modal show={showSubmitModal} onHide={handleCloseSubmitModal} size="lg" backdrop="static" keyboard={false}>
                            <Modal.Header><Modal.Title className='Modal-title-submit-form'>Confirm Application Family Data Submission</Modal.Title></Modal.Header>
                            <Modal.Body>Are you sure you want to update this Data? Please verify whether all the inputs are correct.</Modal.Body>
                            <Modal.Footer>
                                <Button className='signout-modal-button'  onClick={handleCloseSubmitModal}>Cancel</Button>
                                <Button  className='close-button' onClick={handleUpdateModal}>Submit</Button>
                            </Modal.Footer>
                        </Modal>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PatentUpdate;