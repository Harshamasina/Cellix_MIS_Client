import { useEffect, useState } from 'react';
import { Parallax } from 'react-parallax';
import { auth } from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Login = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/key+2.jpg";
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [phone, setPhone] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [empData, setEmpData] = useState([]);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
      const fetchData = async () => {
        try{
          const res = await axios.get('https://misbackend.cellixbio.info/api/getnumbers');
          setEmpData(res.data);
        } catch (err) {
          console.error(err);
          setError(err.message);
        }
      };
      fetchData();
    }, []);

    const onCaptchaVerify = () => {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              onSignup();
            },
            "expired-callback": () => {},
          },
          auth
        );
      }
    };

    const onSignup = () => {
      if( !phone || !employeeId) {
        setError("Please enter all the fields!");
        return;
      }
      const empIDRegex = /^(CLX-|clx-)(EMP-|emp-)\d{3}$/;
      if(!empIDRegex.test(employeeId)){
        setError("Invalid Employee ID");
        return;
      }
      const matchingEmp = empData.find((emp) => emp.phone === "+" + phone && emp.emp_id === employeeId);
      if (!matchingEmp) {
        setError("Invalid Credentials");
        return;
      }
      setError("");
      setLoading(true);
      onCaptchaVerify();
      const appVerifier = window.recaptchaVerifier;
      const formatPh = "+" + phone;
      signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOTP(true);
        setLoading(false);
        startTimer();
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
    };

    const onOTPVerify = () => {
      setLoading(true);
      window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setLoading(false);
      });
    };

    const startTimer = () => {
      setResendDisabled(true);
      setTimer(90);
      const interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 1) {
            clearInterval(interval);
            setResendDisabled(false);
          }
          return prevTime - 1;
        });
      }, 1000);
      return interval;
    };

    const handleResendOtp = () => {
      setOtp("");
      const interval = startTimer();
      const appVerifier = window.recaptchaVerifier;
      const formatPh = "+" + phone;
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setShowOTP(true);
          toast.success("OTP sent successfully!");
          clearInterval(interval);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    };

    const handleEmployee = (event) => {
      setEmployeeId(event.target.value);
    };

    const handleOtp = (event) => {
      setOtp(event.target.value);
    };

    return (
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

            <div>
              <Toaster toastOptions={{ duration: 4000 }} />
              <div id="recaptcha-container"></div>
              { user ? (
                <h2 className="text-center text-white font-medium text-2xl">Login Successful</h2>
              ) : (<div className='Login-Container'>
                      <form className='loginform'>
                          <header>Cellix Bio MIS</header>
                          {
                            showOTP ? (
                              <>
                                <h5 style={{marginTop: '2%'}}>Enter OTP</h5>
                                <div className='otp-input-box'>
                                  <input 
                                    type="text" 
                                    name='otp'
                                    value={otp}
                                    autoComplete="off"
                                    onChange={handleOtp}
                                  />  
                                </div>

                                <input 
                                  type='button' 
                                  className="loginbutton" 
                                  value={loading ? ("Verifying OTP") : ("Verify OTP")}
                                  onClick={onOTPVerify}
                                />

                                <div className="resend-otp-box">
                                  <Button
                                    className="resend-otp-button"
                                    onClick={handleResendOtp}
                                    disabled={resendDisabled}
                                    size='sm'
                                  >
                                    Resend OTP {resendDisabled ? (<span style={{color: "#ffffff"}}>{timer}</span>) : ""}
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <>
                                <PhoneInput 
                                  country={"in"} 
                                  value={phone} 
                                  onChange={setPhone}
                                  inputClass='phone-input'
                                  placeholder='Enter your Phone Number'
                                  inputProps={{
                                    className: 'phone-input',
                                  }}
                                  inputStyle={{paddingLeft: '50px'}}
                                  buttonStyle={{height: '40px', marginLeft: '13px', borderRadius: '5px', marginTop: '2px'}}
                                />

                                <input 
                                  type="text" 
                                  placeholder='Enter your Employee ID'
                                  name='emp_id'
                                  value={employeeId}
                                  autoComplete="off"
                                  onChange={handleEmployee}
                                />

                                <input 
                                  type='button' 
                                  className="loginbutton" 
                                  value={loading ? ("Sending OTP") : ("Send OTP")}
                                  onClick={onSignup}
                                />
                              </>
                            )
                          }
                          <h4 className='error-message'>{error}</h4>
                      </form>
                  </div>
                )}
            </div>
        </div>
    );
};

export default Login;