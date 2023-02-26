import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Home from "../Body/Home/Home";
import Patents from "../Body/Patents/Patents";
import Firms from "../Body/Firms/Firms";
import Login from "../Body/Login/Login";
import Logo from './Logo';
import './Header.css';
import NewPatents from '../Body/NewPatents/NewPatents';
import Register from '../Body/Login/Register';
import PatentInfo from '../Body/Patents/PatentInfo';
import Notifications from '../Body/Notifications/Notifications';
import Error404 from '../Body/error404';
import PatentUpdate from '../Body/Patents/PatentUpdate';
import MultiNPEForm from '../Body/NewPatents/MultiNPEForm';
import PCTPatentForm from '../Body/NewPatents/PCTPatentForm';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';



function NavBar(props) {
        const [login, setLogin] = useState(null);
        const [changeNavbar, setChangeNavbar] = useState(false);
        const navigate = useNavigate();
       
        const changeBackground = () => {
            if(window.scrollY >= 80){
                setChangeNavbar(true);
            }else{
                setChangeNavbar(false);
            }
        }
        window.addEventListener('scroll', changeBackground);

        const handleSignOut = () => {
            signOut(auth).then(() => {
                window.alert("Signed Out Successfully");
                // navigate('/login');
            }).catch((err) => {
                console.log("Error", err);
            });
        }
        
        useEffect(() => {
            const handleLogout = auth.onAuthStateChanged((user) => {
                setLogin(user);
            });
            return () => handleLogout();
        }, []);

        return (
            <>
                <div>
                    <Navbar collapseOnSelect  variant={"dark"} expand="lg" className={changeNavbar ? 'color-nav-scroll' : 'color-nav'}>
                        <Logo></Logo>
                        <Navbar.Brand href="#"> </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='toggle'/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav
                                className="ms-auto my-2 my-xxl-0 gap-2 me-3"
                                style={{ maxHeight: '100%',fontSize:'17px'}}
                                responsive-navbar-nav
                            >
                                {
                                    login && (
                                        <>
                                            <Nav.Link className='navbar_link' as={Link} to="/home" eventKey="0">Home</Nav.Link>
                                            <Nav.Link className='navbar_link' as={Link} to="/patents" eventKey="1">Patents</Nav.Link>
                                            <Nav.Link className='navbar_link' as={Link} to="/firms" eventKey="2">Firms</Nav.Link>
                                            <Nav.Link className='navbar_link' as={Link} to="/newpatent" eventKey="3">New Entry</Nav.Link>
                                            <Nav.Link className='navbar_link' as={Link} to="/notifications" eventKey="4">Notifications</Nav.Link>
                                            <Nav.Link className='navbar_link' as={Link} to="/" eventKey="6">{props.name ? `${props.name}` : ""}</Nav.Link>
                                        </>
                                    )
                                }
                                {
                                    login ? ( <Button className='signout-button' onClick={handleSignOut}>Sign Out</Button> ) : (
                                        <Button className='signin-button' onClick={() => navigate('/login')}>Log In</Button>
                                    )
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                
                <div>
                    <Routes>
                        <Route path='/home' element={<Home></Home>}></Route>
                        <Route path='/patents' element={<Patents></Patents>}></Route>
                        <Route path='/newpatent' element={<NewPatents></NewPatents>}></Route>
                        <Route path='/firms' element={<Firms></Firms>}></Route>
                        <Route path='/notifications' element={<Notifications></Notifications>}></Route>
                        <Route path='/patentinfo/:ref' element={<PatentInfo></PatentInfo>}></Route>
                        <Route path='/patentupdate' element={<PatentUpdate></PatentUpdate>}></Route>
                        <Route path='/login' element={<Login></Login>}></Route>
                        <Route path='/register' element={<Register></Register>}></Route>
                        <Route path='/misform' element={<MultiNPEForm></MultiNPEForm>}></Route>
                        <Route path='/pctpatentform' element={<PCTPatentForm></PCTPatentForm>}></Route>
                        <Route path='/' element={<Home></Home>}></Route>
                        <Route path='*' element={<Error404></Error404>}></Route>
                    </Routes>
                </div>
            </>
        );
    }
export default NavBar;
