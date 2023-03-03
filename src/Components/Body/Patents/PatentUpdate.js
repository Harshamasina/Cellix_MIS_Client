import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Parallax } from 'react-parallax';
import { useParams } from 'react-router';
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import { IoMdGlobe } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';

const PatentUpdate = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/checklist+1.jpg";
    const { id } = useParams();
    const [patent, setPatent] = useState([]);
    const [updatePatent, setUpdatePatent] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`/api/getpatentid/${id}`);
                setPatent(res.data);
                setUpdatePatent(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatePatent(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleNPEForm = (e, i) => {
        const { name, value } = e.target;
        const fieldName = name.split('.')[1];

        setUpdatePatent( prevState => {
            const newNPEArray = [...prevState.npe];
            newNPEArray[i][fieldName] = value;
            return{
                ...prevState,
                npe: newNPEArray
            };
        });
    }

    const handleModal = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.patch(`/api/updatepatentid/${id}`, updatePatent);
            console.log(res);
            setShowModal(false);
        } catch (err) {
            console.error(err);
            setError(err);
        }
    };

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
                            <Link className='patentnpe-link' to={"/addnewnpe/"+patent._id}><IoMdGlobe /></Link>
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
                                    value={ updatePatent?.ref_no || '' }
                                    onChange={handleInputChange}
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
                                    value={ updatePatent?.prv_dof || '' }
                                    onChange={handleInputChange}
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
                                    value={ updatePatent?.prv_appno || '' }
                                    onChange={handleInputChange}
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
                                    value={ updatePatent?.prv_dof || '' }
                                    onChange={handleInputChange}
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
                                    value={ updatePatent?.pct_appno || '' }
                                    onChange={handleInputChange}
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
                                    value={ updatePatent?.pct_isa || '' }
                                    onChange={handleInputChange}
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
                                    value={ updatePatent?.pct_18 || '' }
                                    onChange={handleInputChange}
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
                                    value={ updatePatent?.pct_22_md || '' }
                                    onChange={handleInputChange}
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
                                    value={ updatePatent?.pct_30_31 || '' }
                                    onChange={handleInputChange}
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
                                    value={ updatePatent?.pct_dl || '' }
                                    onChange={handleInputChange}
                                >
                                </input>
                            </div>
                        </div>
                        {
                            updatePatent?.npe?.map((item, index) => (
                                <div className='patent-details' key={index}>
                                    <h4>{updatePatent.npe[index].npe_country}</h4>
                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_appno`}>NPE Application Number</label>
                                        <input
                                            type="text"
                                            name={`npe[${index}].npe_appno`}
                                            value={updatePatent.npe[index].npe_appno.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_dof`}>NPE Date of Filing</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_dof`}
                                            value={updatePatent.npe[index].npe_dof.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_firms`}>NPE Firms</label>
                                        <input
                                            type="text"
                                            name={`npe[${index}].npe_firms`}
                                            value={updatePatent.npe[index].npe_firms.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_fer_i`}>NPE FER Issue Date</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_fer_i`}
                                            value={updatePatent.npe[index].npe_fer_i.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_fer_f`}>NPE FER Final Date</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_fer_f`}
                                            value={updatePatent.npe[index].npe_fer_f.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_us_foa`}>NPE First Office Action Date(US)</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_us_foa`}
                                            value={updatePatent.npe[index].npe_us_foa.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_us_soa`}>NPE Second Office Action Date(US)</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_us_soa`}
                                            value={updatePatent.npe[index].npe_us_soa.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_us_rc`}>NPE request for Continuation(US)</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_us_rc`}
                                            value={updatePatent.npe[index].npe_us_rc.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_us_rr`}>NPE Response to Examination Report(US)</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_us_rr`}
                                            value={updatePatent.npe[index].npe_us_rr.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_us_fa`}>NPE Final Action(US)</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_us_fa`}
                                            value={updatePatent.npe[index].npe_us_fa.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>


                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_in_appeal`}>NPE Appeal Date(IN)</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_in_appeal`}
                                            value={updatePatent.npe[index].npe_in_appeal.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_in_hearing`}>NPE Hearing Date(IN)</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_in_hearing`}
                                            value={updatePatent.npe[index].npe_in_hearing.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_in_ser`}>NPE Second Examination Report(IN)</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_in_ser`}
                                            value={updatePatent.npe[index].npe_in_ser.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_ep_161`}>NPE Rule 161(EP)</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_ep_161`}
                                            value={updatePatent.npe[index].npe_ep_161.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_ep_desc`}>NPE Europe Granted / Rejected(EP)</label>
                                        <select
                                            type="text"
                                            name={`npe[${index}].npe_ep_desc`}
                                            value={updatePatent.npe[index].npe_ep_desc.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        >
                                                <option defaultValue disabled>Select NPE Status</option>
                                                <option value="1">Granted</option>
                                                <option value="0">Rejected</option>
                                        </select>
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_ep_pub`}>NPE claim to publication Date(EP)</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_ep_pub`}
                                            value={updatePatent.npe[index].npe_ep_pub.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_ep_ser`}>NPE Europe Second Examination Report(EP)</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_ep_ser`}
                                            value={updatePatent.npe[index].npe_ep_ser.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_ep_tac`}>NPE translation of accepted Claim(EP)</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_ep_tac`}
                                            value={updatePatent.npe[index].npe_ep_tac.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_ep_val`}>NPE Validation(EP)</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_ep_val`}
                                            value={updatePatent.npe[index].npe_ep_val.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_grant`}>NPE Grant Date</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_grant`}
                                            value={updatePatent.npe[index].npe_grant.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_patent`}>NPE Patent Number</label>
                                        <input
                                            type="text"
                                            name={`npe[${index}].npe_patent`}
                                            value={updatePatent.npe[index].npe_patent.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_if`}>NPE Issue Fee Date</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_if`}
                                            value={updatePatent.npe[index].npe_if.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_annuity`}>NPE Annuities Date</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_annuity`}
                                            value={updatePatent.npe[index].npe_annuity.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>

                                    <div className='input-box'>
                                        <label className="details" htmlFor={`npe[${index}].npe_rfe`}>NPE Request for Examination Date</label>
                                        <input
                                            type="date"
                                            name={`npe[${index}].npe_rfe`}
                                            value={updatePatent.npe[index].npe_rfe.toString() || ''}
                                            onChange={event => handleNPEForm(event, index)}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                        <div className="button">
                            <input 
                                type="button"
                                name="Update Patent"
                                value="Update Patent"
                                onClick={handleModal}
                            >
                            </input>
                        </div>
                        <Modal show={showModal} onHide={handleModalClose}>
                            <Modal.Header >
                                <Modal.Title className='Modal-title-Update'>Update MIS NPE Data</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{textAlign: 'center', fontSize: '1.1vw'}}>Are you sure you want to update MIS NPE Data</Modal.Body>
                            <Modal.Footer>
                                <Button className='signout-modal-button' onClick={handleModalClose} size="lg">No</Button>
                                <Button className='close-button' onClick={handleUpdateSubmit} size="lg">Yes</Button>
                            </Modal.Footer>
                        </Modal>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PatentUpdate;