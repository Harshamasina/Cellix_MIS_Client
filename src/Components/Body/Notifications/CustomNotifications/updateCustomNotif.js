import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { Parallax } from 'react-parallax';
import { Button, Modal } from "react-bootstrap";
import DeleteCustomNotif from './DeleteCustomNotif';
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Helmet } from "react-helmet";

const UpdateCustomNotif = () => {
    const { id } = useParams();
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Deadline.jpg";
    const [notification, setNotification] = useState({
        ref_no: "",
        date: "",
        field: "",
        descp: ""
    });
    const [confirmCode, setConfirmCode] = useState('');
    const [errorMessage, setErrorMessage]  = useState('');
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://misbackend.cellixbio.info/api/getcnotification/${id}`);
                setNotification(res.data);
                setError(res.data.message);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);
    console.log(notification);

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setNotification(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    const handleUpdateModal = async () => {
        try{
            const res = await axios.patch(`https://misbackend.cellixbio.info/api/updatecnotification/${id}`, notification, {
                headers: { 'confirmCode': confirmCode },
            });
            if(res.status === 201){
                console.log(res);
                setErrorMessage(res.data.message);
                alert("Notification Updated Successfully");
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            setErrorMessage(err.response.data.error);
            setConfirmCode('');
        }
    }

    const handleModalClose= () => {
        setShowModal(false);
        setShowPassword(false);
    }

    const toggleShowPassword = () => setShowPassword(!showPassword);

    if(loading){
        return (
            <div>
                <Dna
                    visible={true}
                    height="20%"
                    width="20%"
                    ariaLabel="dna-loading"
                    wrapperStyle={{marginLeft: '40%', marginTop: '10%'}}
                />
            </div>
        );
    }

    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    }
    return(
        <div>
            <Helmet>
                <title>Update Custom Notification | MIS</title>
                <meta name="description" content="Cellix Bio MIS Application create custom notification page"></meta>
            </Helmet>
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
                        placeholder='Enter your Reference Number'
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
                        value="Update Notification"
                        onClick={handleUpdate}
                    />

                    <div className="delete-update-notification">
                        <DeleteCustomNotif notificationId = {notification._id} />
                    </div>

                    <Modal show={showModal} onHide={handleModalClose} backdrop="static" keyboard={false} size="lg" centered>
                        <Modal.Header >
                            <Modal.Title className='Modal-title-pct'>Confirm Submission</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to update the form? Please verify all data inserted correctly if so Please enter the confirmation code to update the notification</p>
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
                            <Button className = "close-button" onClick={handleUpdateModal} disabled={!confirmCode}>Submit</Button>
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
export default UpdateCustomNotif;