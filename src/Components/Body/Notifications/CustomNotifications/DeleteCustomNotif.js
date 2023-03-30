import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdOutlineNotificationsOff } from "react-icons/md";
import { useNavigate } from "react-router";
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const DeleteCustomNotif = ({notificationId}) => {
    const [deleteModal, setDeleteModal] =  useState(false);
    const [confirmCode, setConfirmCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`https://misbackend.cellixbio.info/api/deletenotification/${notificationId}`, {
                headers: { 'confirmCode': confirmCode },
            });
            if(res.status === 201){
                setErrorMessage(res.data.message);
                setDeleteModal(false);
                navigate("/customnotifications");
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            setErrorMessage(err.response.data.error);
            setConfirmCode('');
        }
    };

    const handleCloseModal= () => {
        setDeleteModal(false);
        setShowPassword(false);
    }

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return(
        <div>
            <MdOutlineNotificationsOff onClick={() => setDeleteModal(true)} />
            
            <Modal size='lg' show={deleteModal} onHide={handleCloseModal} centered backdrop="static" keyboard={false}>
                <Modal.Header  className='justify-content-center' style={{color: "#FF4433"}}>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this notification if so please enter the confirmation code to delete</p>
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
                    <Button className='close-button'  onClick={handleCloseModal}>Cancel</Button>
                    <Button 
                        className='signout-modal-button'
                        disabled={!confirmCode}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DeleteCustomNotif;