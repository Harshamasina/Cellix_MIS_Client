import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/privacy+new+(Crop).jpg";
    const ForgotPassword = () => {
        return(
            window.alert("Please Contact Admin")
        );
    }
    const [user, setUser] = useState({
        email: "",
        emp_id: "",
        password: ""
    });
    let name, value;
    let handleInputs = (e) => {
        name=e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
    };
    console.log(user);
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
                        placeholder='Enter your Email'
                        name='email'
                        value={user.email}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="text" 
                        placeholder='Enter your Employee Id'
                        name='emp_id'
                        value={user.emp_id}
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
                    >
                    </input>
                    <div className="login-links">
                        <span className='forgot-pass' onClick={ForgotPassword}>Forgot Password</span>
                        <Link to="/register" className='register-Link'>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;