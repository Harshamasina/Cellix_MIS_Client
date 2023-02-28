import { useState } from 'react';
import { Parallax } from 'react-parallax';
import { auth } from '../../../config/firebase';
import { updatePassword } from 'firebase/auth';

const UpdatePassword = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/fingerprint.jpg";
    const [pass, setPass] = useState({
        email: "",
        password: "",
        cpassword: ""
    });
    const [ errorMsg, setErrorMsg ] = useState("");
    const [message, setMessage] = useState("");
    const user = auth.currentUser;
    let name, value;

    let handleInputs = (e) => {
        name=e.target.name;
        value = e.target.value;
        setPass({...pass, [name]:value});
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        if( !pass.email || !pass.password || !pass.cpassword ){
            setErrorMsg("All Fields are Required");
            return;
        }
        if( pass.password !== pass.cpassword ){
            setErrorMsg("Passwords does not match");
            return;
        }
        setErrorMsg("");
        updatePassword(user, pass.password)
        .then((res) => {
            console.log(res);
            setMessage("Successfully updated your password.");
            setPass({
                email: "",
                password: "",
                cpassword: ""
            });
        })
        .catch((err) => {
            setErrorMsg(err.message);
            console.log("Error", err.message);
        });
    }

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
                    <input 
                        type="email" 
                        placeholder='Enter your Email ID*'
                        autoComplete="off"
                        name='email'
                        value={pass.email}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="password" 
                        placeholder='Enter your New Password*'
                        autoComplete="off"
                        name='password'
                        value={pass.password}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="password" 
                        placeholder='Confirm your New Password*'
                        autoComplete="off"
                        name='cpassword'
                        value={pass.cpassword}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="button" 
                        className="loginbutton" 
                        value="Update Password"
                        onClick={handleUpdatePassword}
                    >
                    </input>
                    { message && <h4 className='error-message'>{message}</h4> }
                    { errorMsg && <h4 className='error-message'>{errorMsg}</h4> }
                </form>
            </div>
        </div>
    );
}
export default UpdatePassword;