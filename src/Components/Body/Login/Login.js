import { Parallax } from 'react-parallax';

const Login = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/privacy+new+(Crop).jpg";
    const ForgotPassword = () => {
        return(
            window.alert("Please Contact Admin")
        );
    }
    return(
        <div>
            <Parallax bgImage={ img } strength={200} bgImageAlt="parallaximg" blur={1}>
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
                    <p to="/" onClick={ForgotPassword}>Forgot Password</p>
                    <input 
                        type="submit" 
                        className="loginbutton" 
                        value="Login"
                    >
                    </input>
                </form>
            </div>
        </div>
    );
}
export default Login;