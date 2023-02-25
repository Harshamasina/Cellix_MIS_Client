import { useState } from 'react';
import { Parallax } from 'react-parallax';
import { Link, useNavigate } from 'react-router-dom';

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
    let name, value;
    let handleInputs = (e) => {
        name=e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
    };
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
                        placeholder='Enter your Name'
                        autoComplete="off"
                        name='name'
                        value={user.name}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="text" 
                        placeholder='Enter your Email'
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
                        placeholder='Enter your Employee Id'
                        autoComplete="off"
                        name='emp_id'
                        value={user.emp_id}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="password" 
                        placeholder='Enter your Password'
                        autoComplete="off"
                        name='password'
                        value={user.password}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="password" 
                        placeholder='Confirm your Password'
                        autoComplete="off"
                        name='cpassword'
                        value={user.cpassword}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="submit" 
                        className="loginbutton" 
                        value="Register"
                        onClick={() => navigate('/login')}
                    >
                    </input>
                    <div className="login-links">
                        <Link to="/login" className='register-Link'>Already a User? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register;