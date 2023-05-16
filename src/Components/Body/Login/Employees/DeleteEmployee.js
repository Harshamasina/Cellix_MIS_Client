import axios from "axios";
import { useState } from "react";
import { Button, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { AiOutlineUserDelete } from "react-icons/ai";

const DeleteEmployee = ({employeeId}) => {
    const [deleteModal, setDeleteModal] =  useState(false);
    const [confirmCode, setConfirmCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/deleteemployee/${employeeId}`, {
                headers: { 'confirmCode': confirmCode },
            });
            if(res.status === 201){
                setErrorMessage(res.data.message);
                setDeleteModal(false);
                setConfirmCode('');
                window.location.reload();
                navigate("/employeedashboard");
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
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const deletePopover = (
        <Popover id="update-popover">
            <Popover.Body as="span" className='popover-msg'>Delete</Popover.Body>
        </Popover>
    );

    return(
        <div>
            <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={deletePopover}>
                <div className="delete-employee"><AiOutlineUserDelete onClick={() => setDeleteModal(true)} /></div>
            </OverlayTrigger>

            <Modal size='lg' show={deleteModal} onHide={handleCloseModal} centered backdrop="static" keyboard={false}>
                <Modal.Header  className='justify-content-center' style={{color: "#FF4433"}}>
                    <Modal.Title>Confirm Employee Deletion</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to delete this Employee Information</p>
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
};

export default DeleteEmployee;
