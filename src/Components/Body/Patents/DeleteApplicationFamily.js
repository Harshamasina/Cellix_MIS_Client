import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router';

const DeleteApplicationFamily = ({PatentId}) => {
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState(false);
    const [confirmCode, setConfirmCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`https://misbackend.cellixbio.info/api/deletepatent/${PatentId}`, {
                headers: { 'confirmCode': confirmCode },
            });
            if(res.status === 201){
                setErrorMessage(res.data.message);
                setDeleteModal(false);
                navigate('/patents');
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            setErrorMessage(err.response.data.error);
            setConfirmCode('');
        }
    }

    return(
        <div>
            <div className="remove-application-container">
                <Button className= "remove-application" onClick={() => setDeleteModal(true)}>Remove Application</Button>
            </div>
            <Modal size='lg' show={deleteModal} onHide={() => setDeleteModal(false)} centered backdrop="static" keyboard={false}>
                <Modal.Header  className='justify-content-center' style={{color: "#FF4433"}}>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this Application if so please enter the confirmation code to delete the Application</p>
                    <div className='input-box'>
                        <input
                            type="text"
                            placeholder="Enter confirmation code"
                            value={confirmCode}
                            onChange={ (e) => setConfirmCode(e.target.value) }
                        />
                    </div>
                    {errorMessage && ( <p className="text-danger mt-3">{errorMessage}</p> )}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='close-button'  onClick={() => setDeleteModal(false)}>Cancel</Button>
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