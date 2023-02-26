import { useState } from 'react';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/privacy+new+(Crop).jpg";
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        emp_id: "",
        password: "",
        cpassword: ""
    });
    const [ errorMsg, setErrorMsg ] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);

    let name, value;
    let handleInputs = (e) => {
        name=e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
    };

    let handleSubmit = () => {
        if( !user.name || !user.email || !user.phone || !user.emp_id || !user.password || !user.cpassword){
            setErrorMsg("All Fields are required");
            return;
        }
        if( user.password !== user.cpassword ){
            setErrorMsg("Passwords does not match")
            return;
        }
        setErrorMsg("");
        setButtonDisabled(true);
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(async(res) => {
                setButtonDisabled(false);
                const userDetails = res.user;
                await updateProfile(userDetails, {
                    displayName: user.name,
                });
                navigate('/');
            })
            .catch((err) => {
                setButtonDisabled(false);
                setErrorMsg(err.message);
                console.log("Error", err.message);
            });
    }

    return(
        <div>
            <Parallax bgImage={ img } strength={150} bgImageAlt="parallaximg" blur={1}>
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>Login</h1>
                        </div>
                    </div>
                </div>
            </Parallax>
            <div className='Login-Container'>
                <form method='#' className='loginform'>
                    <input 
                        type="text" 
                        placeholder='Enter your Name*'
                        autoComplete="off"
                        name='name'
                        value={user.name}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="text" 
                        placeholder='Enter your Email*'
                        autoComplete="off"
                        name='email'
                        value={user.email}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="tel" 
                        placeholder='Enter your Phone Number'
                        autoComplete="off"
                        name='phone'
                        value={user.phone}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="text" 
                        placeholder='Enter your Employee Id*'
                        autoComplete="off"
                        name='emp_id'
                        value={user.emp_id}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="password" 
                        placeholder='Enter your Password*'
                        autoComplete="off"
                        name='password'
                        value={user.password}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="password" 
                        placeholder='Confirm your Password*'
                        autoComplete="off"
                        name='cpassword'
                        value={user.cpassword}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="button" 
                        className="loginbutton" 
                        value="Register"
                        onClick={handleSubmit}
                        disabled={buttonDisabled}
                    >
                    </input>
                    <h4 className='error-message'>{errorMsg}</h4>
                    <div className="login-links">
                        <Link to="/login" className='register-Link'>Already a User? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register;