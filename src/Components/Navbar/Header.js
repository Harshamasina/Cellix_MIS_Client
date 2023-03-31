import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import CustomNotifications from '../Body/Notifications/CustomNotifications/CustomNotifications';
import CreateCustomNotif from '../Body/Notifications/CustomNotifications/CreateCustomNotif';
import UpdateCustomNotif from '../Body/Notifications/CustomNotifications/updateCustomNotif';
import Error404 from '../Body/error404';
import PatentUpdate from '../Body/Patents/PatentUpdate';
import PCTPatentForm from '../Body/NewPatents/PCTPatentForm';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import Modal from 'react-bootstrap/Modal';
import ForgotPassword from '../Body/Login/ForgotPassword';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UpdatePassword from '../Body/Login/UpdatePassword';
import { MdKeyboardArrowDown } from "react-icons/md";
import DeletedApplications from '../Body/Patents/DeletedApplications/DeletedApplications';
import DeletedApplicationInfo from '../Body/Patents/DeletedApplications/DeletedApplicationInfo';
import CountryNPE from '../Body/Firms/CountryNPE';
import { VscSignOut } from 'react-icons/vsc';

function NavBar() {
    const [login, setLogin] = useState(JSON.parse(localStorage.getItem('login')));
    const [changeNavbar, setChangeNavbar] = useState(false);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    
    const changeBackground = () => {
        if(window.scrollY >= 80){
            setChangeNavbar(true);
        }else{
            setChangeNavbar(false);
        }
    }
    window.addEventListener('scroll', changeBackground);

    useEffect(() => {
        const handleLogIn = auth.onAuthStateChanged((user) => {
            if(user){
                localStorage.setItem('login', JSON.stringify(user));
                setLogin(user);
            } else {
                localStorage.removeItem('login');
                setLogin(null);
            }
        });
        return () => handleLogIn();
    }, []);

    const handleClose = () => setModal(false);
    const handleShow = () => setModal(true);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            window.alert("Signed Out Successfully");
            localStorage.removeItem('user');
            setModal(false);
            navigate('/login');
        }).catch((err) => {
            console.log("Error", err);
        });
    }

    useEffect(() => {
        const TimeOut = setTimeout(() => {
            handleSignOut();
        }, 24 * 60 * 60 * 1000);
        return () => {
            clearTimeout(TimeOut);
        }
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('login');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            const expirationTime = 24 * 60 * 60 * 1000;
            const warningTime = expirationTime - 5 * 60 * 1000;
            if (Date.now() - user.lastLoginAt > warningTime) {
                window.alert('Your session will expire soon. Please log out and log in again to continue using the app.');
            }
        }
    }, []);

    return (
        <>
            <div>
                <Navbar collapseOnSelect  variant={"dark"} expand="lg" className={changeNavbar ? 'color-nav-scroll' : 'color-nav'}>
                    <Logo></Logo>
                    <Navbar.Brand href="#"> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className='toggle' />
                    <Navbar.Collapse id="responsive-navbar-nav" responsive={true.toString()}>
                        <Nav
                            className="ms-auto my-2 my-xxl-0 gap-2 me-3"
                            style={{ maxHeight: '100%',fontSize:'17px'}}
                            responsive-navbar-nav
                        >
                            {
                                login && (
                                    <>
                                        <Nav.Link className='navbar_link' as={Link} to="/home" eventKey="0">Home</Nav.Link>
                                        <Nav.Link className='navbar_link' as={Link} to="/patents" eventKey="1">Applications</Nav.Link>
                                        <Nav.Link className='navbar_link' as={Link} to="/firms" eventKey="2">Firms</Nav.Link>
                                        <Nav.Link className='navbar_link' as={Link} to="/newpatent" eventKey="3">New Entry</Nav.Link>
                                        <Nav.Link className='navbar_link' as={Link} to="/notifications" eventKey="4">Notifications</Nav.Link>
                                        <NavDropdown title={<span>{login ? login.displayName : ""} <MdKeyboardArrowDown /></span>} id="basic-nav-dropdown" className='nav-dropdown'>
                                            <NavDropdown title={<span>About <MdKeyboardArrowDown /></span>} className='subnav-dropdown'>
                                                <NavDropdown.Item className='subdropdown-link'>{login.displayName}</NavDropdown.Item>
                                                <NavDropdown.Item className='subdropdown-link'>{login.email}</NavDropdown.Item>
                                            </NavDropdown>
                                        <NavDropdown.Item><Nav.Link as={Link} to='updatepassword' className='dropdown-link' eventKey="5">Change Password</Nav.Link></NavDropdown.Item>
                                            {
                                                login ? ( <Button className='signout-button' onClick={handleShow}>Sign Out</Button> ) : (
                                                    <Button className='signin-button' onClick={() => navigate('/login')}>Log In</Button>
                                                )
                                            }
                                        </NavDropdown>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            
            <div>
                <Routes>
                    <Route path='/home' element={login ? <Home /> : <Navigate to='/login' />} />
                    <Route path='/patents' element={login ? <Patents /> : <Navigate to='/login' />} />
                    <Route path='/newpatent' element={login ? <NewPatents /> : <Navigate to='/login' />} />
                    <Route path='/firms' element={login ? <Firms /> : <Navigate to='/login' />} />
                    <Route path='/notifications' element={login ? <Notifications /> : <Navigate to='/login' />} />
                    <Route path='/customnotifications' element={login ? <CustomNotifications /> : <Navigate to='/login' />} />
                    <Route path='/createnotifications' element={login ? <CreateCustomNotif /> : <Navigate to='/login' />} />
                    <Route path='/updatenotifications/:id' element={login ? <UpdateCustomNotif /> : <Navigate to='/login' />} />
                    <Route path='/patentinfo/:ref' element={login ? <PatentInfo /> : <Navigate to='/login' />} />
                    <Route path='/patentupdate/:id' element={login ? <PatentUpdate /> : <Navigate to='/login' />} />
                    <Route path='/deletedapplications' element={login ? <DeletedApplications /> : <Navigate to='/login' />} />
                    <Route path='/deletedapplication/:ref' element={login ? <DeletedApplicationInfo /> : <Navigate to='/login' />} />
                    <Route path='/countrynpe/:countrycode' element={login ? <CountryNPE /> : <Navigate to='/login' />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/forgotpassword' element={<ForgotPassword />} />
                    <Route path='/updatepassword' element={login ? <UpdatePassword /> : <Navigate to='/login' />} />
                    <Route path='/pctpatentform' element={login ? <PCTPatentForm /> : <Navigate to='/login' />} />
                    <Route path='/' element={login ? <Home /> : <Navigate to='/login' />} />
                    <Route path='*' element={<Error404 />} />
                </Routes>
            </div>

            <div>
                <Modal show={modal} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
                    <Modal.Header>
                        <Modal.Title className='Modal-header'><span>{login ? login.displayName : ""},</span> Are you Sure you Want To Log Out!</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button className = "close-button" onClick={handleClose}>close</Button>
                        <Button className='signout-modal-button' onClick={handleSignOut}><VscSignOut /> Yes, Logout</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}
export default NavBar;