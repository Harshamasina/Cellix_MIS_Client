import { useState } from 'react';
import { Parallax } from 'react-parallax';
import { auth } from '../../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/notifications+1.jpg";
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setMessage("An email has been sent to reset your password.");
            setErrorMsg("");
        })
        .catch((err) => {
            console.log(err);
            setMessage("");
            setErrorMsg(err.message)
        });
    };

    return(
        <div>
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
                    <header>Forgot Password</header>
                    <input 
                        type="email" 
                        placeholder='Enter your Email ID*'
                        autoComplete="off"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>
                    <input 
                        type="button" 
                        className="loginbutton" 
                        value="Reset Password"
                        onClick={handleResetPassword}
                    >
                    </input>
                    { message && <h4 className='error-message'>{message}</h4> }
                    { errorMsg && <h4 className='error-message'>{errorMsg}</h4> }
                    <div className="login-links">
                        <Link to="/login" className='register-Link'>Back to Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ForgotPassword;