import axios from 'axios';
import { useState } from 'react';
import { Parallax } from 'react-parallax';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const CreateCustomNotif = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Deadline.jpg";
    const [notification, setNotification] = useState({
        ref_no: "",
        date: "",
        field: "",
        descp: ""
    });
    const [confirmCode, setConfirmCode] = useState('');
    const [errorMessage, setErrorMessage]  = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    let name, value;
    let handleInputs = (e) => {
        name=e.target.name;
        value = e.target.value;
        setNotification({...notification, [name]:value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    const handleSubmitModal = async () => {
        try {
            const res = await axios.post('https://misbackend.cellixbio.info/api/cnotification', notification, {
                headers: { 'confirmCode': confirmCode },
            });
            if(res.status === 201){
                console.log(res);
                setErrorMessage(res.data.message);
                setNotification({
                    ref_no: "",
                    date: "",
                    field: "",
                    descp: ""
                });
                alert('Notification created Successfully');
                navigate('/customnotifications');
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
            setErrorMessage(err.response.data.error);
            setConfirmCode('');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return(
        <div>
            <Parallax bgImage={ img } strength={150} bgImageAlt="parallaximg">
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                        </div>
                    </div>
                </div>
            </Parallax>
            <div className='Login-Container'>
                <form className='loginform'>
                    <input 
                        type="text" 
                        placeholder='Enter Reference Number'
                        autoComplete="off"
                        name='ref_no'
                        value={notification.ref_no}
                        onChange={handleInputs}
                    />
                    <input 
                        type="date" 
                        placeholder='Enter the Date'
                        autoComplete="off"
                        name='date'
                        value={notification.date}
                        onChange={handleInputs}
                    />
                    <input 
                        type="text" 
                        placeholder='Enter Field Name'
                        autoComplete="off"
                        name='field'
                        value={notification.field}
                        onChange={handleInputs}
                    />
                    <textarea 
                        type="text" 
                        placeholder='Enter Description'
                        autoComplete="off"
                        name='descp'
                        className='notif-textarea'
                        value={notification.descp}
                        onChange={handleInputs}
                    />
                    <input 
                        type="button" 
                        className="loginbutton" 
                        value="Create Notification"
                        onClick={handleSubmit}
                    />
                    <Modal show={showModal} onHide={handleModalClose} backdrop="static" keyboard={false} size="lg" centered>
                        <Modal.Header >
                            <Modal.Title className='Modal-title-pct'>Confirm Submission</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to submit the form? Please verify all data inserted correctly if so Please enter the confirmation code to submit the Patent</p>
                            <div className='input-box'>
                                    <input
                                        type="password"
                                        placeholder="Enter confirmation code"
                                        value={confirmCode}
                                        onChange={ (e) => setConfirmCode(e.target.value) }
                                    />
                                </div>
                                {errorMessage && ( <p className="text-danger mt-3">{errorMessage}</p> )}
                                <span className='forgot-code' onClick={() => alert("Please contact your Admin")}>Forgot Confirmation Code?</span>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className='signout-modal-button' onClick={handleModalClose}>Cancel</Button>
                            <Button className = "close-button" onClick={handleSubmitModal} disabled={!confirmCode}>Submit</Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="login-links">
                        <Link to='/customnotifications' className='register-Link'>Back to Notifications</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default CreateCustomNotif;