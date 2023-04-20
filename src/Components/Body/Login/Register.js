import { useEffect, useState } from 'react';
import { Parallax } from 'react-parallax';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const Register = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/lady+1.jpg";
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        emp_id: "",
        designation: ""
    });
    const [ errorMsg, setErrorMsg ] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [confirmCode, setConfirmCode] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleInputs = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
          setEmployee({ ...employee, phone: value });
        } else {
          setEmployee({ ...employee, [name]: value });
        }
    };

    let handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    let handleSubmitModal = async () => {
        if( !employee.first_name || !employee.last_name || !employee.email || !employee.phone || !employee.emp_id || !employee.designation){
            setErrorMsg("All Fields are required");
            return;
        }
        const empIDRegex = /^(CLX-|clx-)(EMP-|emp-)\d{3}$/;
        if(!empIDRegex.test(employee.emp_id)){
            setErrorMsg("Invalid Employee ID");
            return;
        }
        setErrorMsg("");
        setButtonDisabled(true);
        try{
            const res = await axios.post('https://misbackend.cellixbio.info/api/login', employee, {
                headers: { 'confirmCode': confirmCode },
            });
            if(res.status === 201){
                console.log(res);
                setErrorMsg(res.data.message);
                setEmployee({
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone: "",
                    emp_id: "",
                    designation: ""
                });
                alert('New Employee created Successfully');
                navigate('/home');
                setConfirmCode('');
                setShowModal(false);
                setButtonDisabled(false);

            }
        } catch (err) {
            console.log(err);
            setErrorMsg(err.response.data.message);
            setConfirmCode('');
            setButtonDisabled(false);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);

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
            <Helmet>
                <title>Register | MIS | Cellix Bio</title>
                <meta name="description" content="Cellix Bio MIS application Register Page" />
            </Helmet>
            
            <Parallax bgImage={ img } strength={150} bgImageAlt="parallaximg">
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>Login</h1>
                        </div>
                    </div>
                </div>
            </Parallax>

            <div className='Login-Container'>
                <form className='loginform'>
                    <input 
                        type="text" 
                        placeholder='Enter your First Name*'
                        autoComplete="off"
                        name='first_name'
                        value={employee.first_name}
                        onChange={handleInputs}
                    />

                    <input 
                        type="text" 
                        placeholder='Enter your Last Name*'
                        autoComplete="off"
                        name='last_name'
                        value={employee.last_name}
                        onChange={handleInputs}
                    />

                    <input 
                        type="email" 
                        placeholder='Enter your Email*'
                        autoComplete="off"
                        name='email'
                        value={employee.email}
                        onChange={handleInputs}
                    />

                    <PhoneInput
                        country={"in"}
                        value={employee.phone}
                        onChange={(value) => {
                            const phone = value.startsWith("+") ? value : `+${value}`;
                            setEmployee({ ...employee, phone });
                        }}
                        inputClass="phone-input"
                        placeholder="Enter your Phone Number"
                        inputProps={{
                            className: "phone-input",
                        }}
                        inputStyle={{ paddingLeft: "50px", marginTop: "3%" }}
                        buttonStyle={{
                            height: "40px",
                            marginLeft: "13px",
                            borderRadius: "5px",
                            marginTop: "3.5%",
                        }}
                    />  

                    <input 
                        type="text" 
                        placeholder='Enter your Employee Id*'
                        autoComplete="off"
                        name='emp_id'
                        value={employee.emp_id}
                        onChange={handleInputs}
                    />

                    <input 
                        type="text" 
                        placeholder='Enter your Designation*'
                        autoComplete="off"
                        name='designation'
                        value={employee.designation}
                        onChange={handleInputs}
                    />

                    <input 
                        type="button" 
                        className="loginbutton" 
                        value="Register"
                        onClick={handleSubmit}
                        disabled={buttonDisabled}
                    />
                    <h4 className='error-message'>{errorMsg}</h4>

                    <Modal show={showModal} onHide={handleModalClose} backdrop="static" keyboard={false} size="lg" centered>
                        <Modal.Header >
                            <Modal.Title className='Modal-title-pct'>Confirm Submission</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Are you sure you want to submit Employee Information? </p>
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
                            <p className="text-danger mt-3">{errorMsg}</p>
                            <span className='forgot-code' onClick={() => alert("Please contact your Admin")}>Forgot Confirmation Code?</span>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button className='signout-modal-button' onClick={handleModalClose}>Cancel</Button>
                            <Button className = "close-button" onClick={handleSubmitModal} disabled={!confirmCode}>Submit</Button>
                        </Modal.Footer>
                    </Modal>
                </form>
            </div>
        </div>
    );
}

export default Register;