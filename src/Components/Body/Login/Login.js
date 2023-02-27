import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/privacy+new+(Crop).jpg";
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
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
        if( !user.email || !user.password){
            setErrorMsg("All Fields are required");
            return;
        }
        setErrorMsg("");
        setButtonDisabled(true);
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(async(res) => {
                setButtonDisabled(false);
                navigate('/');
            })
            .catch((err) => {
                setButtonDisabled(false);
                setErrorMsg(err.message);
                console.log("Error", err.message);
            });
        console.log(user);
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
                    <header>Cellix Bio MIS</header>
                    <input 
                        type="text" 
                        placeholder='Enter your Email'
                        name='email'
                        value={user.email}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="password" 
                        placeholder='Enter your Password'
                        name='password'
                        value={user.password}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="submit" 
                        className="loginbutton" 
                        value="Login"
                        onClick={handleSubmit}
                        disabled={buttonDisabled}
                    >
                    </input>
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