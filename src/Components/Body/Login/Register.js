import { useState } from 'react';
import { Parallax } from 'react-parallax';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/privacy+new+(Crop).jpg";
    const navigate = useNavigate();
    // const [user, setUser] = useState({
    //     name: "",
    //     email: "",
    //     phone: "",
    //     password: "",
    //     cpassword: ""
    // }); 
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
                    >
                    </input>
                    <input 
                        type="text" 
                        placeholder='Enter your Email'
                        autoComplete="off"
                    >
                    </input>
                    <input 
                        type="tel" 
                        placeholder='Enter your Phone Number'
                        autoComplete="off"
                    >
                    </input>
                    <input 
                        type="text" 
                        placeholder='Enter your Employee Id'
                        autoComplete="off"
                    >
                    </input>
                    <input 
                        type="password" 
                        placeholder='Enter your Password'
                    >
                    </input>
                    <input 
                        type="password" 
                        placeholder='Confirm your Password'
                    >
                    </input>
                    <input 
                        type="submit" 
                        className="loginbutton" 
                        value="Register"
                        onClick={() => navigate('/login')}
                    >
                    </input>
                </form>
            </div>
        </div>
    );
}
export default Register;