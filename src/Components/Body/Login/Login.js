import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Helmet } from "react-helmet";

const Login = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/key+2.jpg";
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        emp_id: "",
        password: ""
    });
    const [ errorMsg, setErrorMsg ] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    let name, value;
    let handleInputs = (e) => {
        name=e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
    };

    let handleSubmit = () => {
        if( !user.email || !user.password){
            setErrorMsg("All Fields are required");
            return;
        }
        const empIDRegex = /^(APL|apl)\d{4}|(CLX-|clx-)(EMP-|emp-)\d{3}$/;
        if(!empIDRegex.test(user.emp_id)){
            setErrorMsg("Invalid Employee ID");
            return;
        }
        setErrorMsg("");
        setButtonDisabled(true);
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(async(res) => {
                setButtonDisabled(false);
                navigate('/');
                window.location.reload();
            })
            .catch((err) => {
                setButtonDisabled(false);
                setErrorMsg(err.message);
                console.log("Error", err.message);
            });
    }

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return(
        <div>
            <Helmet>
                <title>Login | MIS | Cellix Bio</title>
                <meta name="description" content="Cellix Bio MIS application Login Page" />
            </Helmet>

            <Parallax bgImage={ img } strength={250} bgImageAlt="parallaximg">
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
                    <header>Cellix Bio MIS</header>
                    <input 
                        type="text" 
                        placeholder='Enter your Email'
                        name='email'
                        value={user.email}
                        onChange={handleInputs}
                        autoComplete="off"
                    />

                    <input 
                        type="text" 
                        placeholder='Enter your Employee ID'
                        name='emp_id'
                        value={user.emp_id}
                        onChange={handleInputs}
                        autoComplete="off"
                    />

                    <div className='password-input-box'>
                        <input 
                            type={ showPassword ? 'text' : 'password' }
                            placeholder='Enter your Password'
                            name='password'
                            value={user.password}
                            onChange={handleInputs}
                            autoComplete="off"
                        />
                        <div className="eye-icon" onClick={toggleShowPassword}>
                            {showPassword ? <BsEyeSlash /> : <BsEye />}
                        </div>
                    </div>

                    <input 
                        type="submit" 
                        className="loginbutton" 
                        value="Login" 
                        onClick={handleSubmit}
                        disabled={buttonDisabled}
                    />

                    <h4 className='error-message'>{errorMsg}</h4>
                    
                    <div className="login-links">
                        <Link to='/forgotpassword' className='register-Link'>Forgot Password</Link>
                        <Link to="/register" className='register-Link'>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;