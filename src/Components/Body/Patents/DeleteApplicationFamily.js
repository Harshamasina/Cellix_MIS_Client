import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router';
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const DeleteApplicationFamily = ({PatentId}) => {
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState(false);
    const [confirmCode, setConfirmCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleDelete = async () => {
        try {
                const res = await axios.delete(`https://misbackend.cellixbio.info/api/deletepatent/${PatentId}`, {
                    headers: { 'confirmCode': confirmCode },
                });
            if(res.status === 201){
                setErrorMessage(res.data.message);
                setDeleteModal(false);
                alert("Application Family got Successfully Deleted and Stored in Backup");
                navigate('/patents');
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            setErrorMessage(err.response.data.error);
            setConfirmCode('');
        }
    }

    const handleCloseModal= () => {
        setDeleteModal(false);
        setShowPassword(false);
    }

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return(
        <div>
            <div className="remove-application-container">
                <Button className= "remove-application" onClick={() => setDeleteModal(true)}><RiDeleteBin5Line /> Delete Application</Button>
            </div>
            <Modal size='lg' show={deleteModal} onHide={handleCloseModal} centered backdrop="static" keyboard={false}>
                <Modal.Header  className='justify-content-center' style={{color: "#FF4433"}}>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this Application if so please enter the confirmation code to delete the Application</p>
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

export default DeleteApplicationFamily;