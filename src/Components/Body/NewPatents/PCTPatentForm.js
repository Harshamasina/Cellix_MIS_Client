import { Parallax } from 'react-parallax';
import { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Helmet } from 'react-helmet';

const PCTPatentForm = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/html+css.jpg";
    const [PCTPatent, setPCTPatent] = useState({
        wno: "",
        pct: "",
        year: "",
        publication_date:"",
        therapeutic_area: "",
        diseases: "",
        formula: "",
        claims: "",
        compounds: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [confirmCode, setConfirmCode] = useState('');
    const [errorMessage, setErrorMessage]  = useState('');
    const [showPassword, setShowPassword] = useState(false);

    let name, value;
    let handleInputs = (e) => {
        name=e.target.name;
        value = e.target.value;
        setPCTPatent({...PCTPatent, [name]:value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    const handleSubmitModal = async () => {
        setSubmitting(true);
        setSubmissionError(null);
        try{
            const res = await axios.post('https://misbackend.cellixbio.info/api/pctpatent', PCTPatent, {
                headers: { 'confirmCode': confirmCode },
            });
            if(res.status === 201){
                console.log(res);
                setErrorMessage(res.data.message);
                setPCTPatent({
                    wno: "",
                    pct: "",
                    year: "",
                    publication_date:"",
                    therapeutic_area: "",
                    diseases: "",
                    formula: "",
                    claims: "",
                    compounds: ""
                });
                alert('Patent Submitted Successfully');
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
            setSubmissionError(err.response.data.message);
            setErrorMessage(err.response.data.error);
            setConfirmCode('');
        } finally {
            setSubmitting(false);
        }
    }

    const handleModalClose = () => {
        setShowModal(false);
        setShowPassword(false);
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return(
        <div>
            <Helmet>
                <title>New International Patent | MIS</title>
                <meta name="description" content="Cellix Bio MIS Application new International Patent entry"></meta>
            </Helmet>

            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='HomePageContent'>
                            <h1>International Patent Form</h1>
                        </div>
                    </div>
                </div>
            </Parallax>

            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to="/home" className='BC-Links'>Home</Link>
                <Link to="/newpatent" className='BC-Links'>New Patent</Link>
                <Link to="/pctpatentform" className='BC-Links'>New Patent Form</Link>
            </Breadcrumbs>

            <div className='PCT-Container'>
                <form onSubmit={handleSubmit} className='PCTform'>
                    <input 
                        type="text" 
                        placeholder='Enter WIPO Number *'
                        autoComplete="off"
                        name= "wno"
                        value={PCTPatent.wno}
                        onChange={handleInputs}
                    />

                    <input 
                        type="text" 
                        placeholder='Enter PCT or Application Number *'
                        autoComplete="off"
                        name= "pct"
                        value={PCTPatent.pct}
                        onChange={handleInputs}
                    />

                    <input 
                        type="text" 
                        placeholder='Enter Published Year *'
                        autoComplete="off"
                        name= "year"
                        value={PCTPatent.year}
                        onChange={handleInputs}
                    />

                    <input 
                        type="text" 
                        placeholder='Enter Publishing Date (dd.mm.yyyy) *'
                        autoComplete="off"
                        name= "publication_date"
                        value={PCTPatent.publication_date}
                        onChange={handleInputs}
                    />

                    <textarea 
                        placeholder='Enter Therapeutic Area *'
                        name="therapeutic_area"
                        value={PCTPatent.therapeutic_area}
                        onChange={handleInputs}
                    />

                    <textarea 
                        placeholder='Enter Diseases *'
                        name= "diseases"
                        value={PCTPatent.diseases}
                        onChange={handleInputs}
                    />

                    <textarea 
                        placeholder='Enter Formulas Image Links ( Upload Images in s3 and then paste each link line wise )'
                        name= "formula"
                        value={PCTPatent.formula}
                        onChange={handleInputs}
                    />

                    <textarea 
                        placeholder='Enter Claims text or Image Links ( Upload Images in s3 and then paste each link line wise )'
                        name= "claims"
                        value={PCTPatent.claims}
                        onChange={handleInputs}
                    />

                    <textarea 
                        placeholder='Enter Compounds Image Links ( Upload Images in s3 and then paste each link line wise )'
                        name= "compounds"
                        value={PCTPatent.compounds}
                        onChange={handleInputs}
                    />

                    <input 
                        type="submit" 
                        className="pctbutton"
                        value={submitting ? 'Submitting... Patent' : 'Submit Patent'}
                        disabled={submitting}
                    />

                    <Modal show={showModal} onHide={handleModalClose} backdrop="static" keyboard={false} size="lg" centered>
                        <Modal.Header >
                            <Modal.Title className='Modal-title-pct'>Confirm Submission</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Are you sure you want to submit the form? Please verify all data inserted correctly if so Please enter the confirmation code to submit the Patent</p>
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
                            <Button className='signout-modal-button' onClick={handleModalClose}>Cancel</Button>
                            <Button className = "close-button" onClick={handleSubmitModal} disabled={!confirmCode}>Submit</Button>
                        </Modal.Footer>
                    </Modal>

                    {submissionError && <p className='error-message'>{submissionError}</p>}
                </form>
            </div>
        </div>
    );
}
export default PCTPatentForm;