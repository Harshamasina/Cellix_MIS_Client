import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
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
import { VscSignOut, VscSignIn } from 'react-icons/vsc';
import NPEApplications from '../Body/Patents/NPEApplications/NPEApplications';
import NPEApplicationsDashboard from '../Body/Patents/NPEApplications/NPEApplicationsDashboard';
import EmployeesDashboard from '../Body/Login/Employees/EmployeesDashboard';
import UpdateEmployee from '../Body/Login/Employees/UpdateEmployee';

function NavBar() {
    const [login, setLogin] = useState(JSON.parse(localStorage.getItem('login')));
    const [changeNavbar, setChangeNavbar] = useState(false);
    const [sessionTimeoutModal, setSessionTimeoutModal] = useState(false); 
    const [modal, setModal] = useState(false);
    const [phone, setPhone] = useState(login ? login.phoneNumber : "");
    const [empData, setEmpData] = useState({});
    const navigate = useNavigate();
    
    const changeBackground = () => {
        if(window.scrollY >= 80){
            setChangeNavbar(true);
        }else{
            setChangeNavbar(false);
        }
    };
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
            setEmpData("");
            setPhone("");
            setSessionTimeoutModal(false);
            navigate('/login');
        }).catch((err) => {
            console.log("Error", err);
        });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('login');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            const expirationTime = 5 * 60 * 60 * 1000;
            const warningTime = expirationTime - 3 * 60 * 1000;
            if (Date.now() - user.lastLoginAt > warningTime) {
                setSessionTimeoutModal(true);
            }
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!phone) {
                setEmpData(null);
                return;
            }
            try{
                const res = await axios.get(`https://misbackend.cellixbio.info/api/getemployee/${phone}`);
                setEmpData(res.data[0]); 
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [phone]);

    return (
        <>
            <div>
                <Navbar collapseOnSelect  variant={"dark"} expand="lg" className={changeNavbar ? 'color-nav-scroll' : 'color-nav'}>
                    <Logo></Logo>
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
                                        <Nav.Link className='navbar_link' as={Link} to="/npeapplications" eventKey="2">NPE Applications</Nav.Link>
                                        <Nav.Link className='navbar_link' as={Link} to="/firms" eventKey="3">Firms</Nav.Link>
                                        <Nav.Link className='navbar_link' as={Link} to="/newpatent" eventKey="4">New Entry</Nav.Link>
                                        <Nav.Link className='navbar_link' as={Link} to="/notifications" eventKey="5">Notifications</Nav.Link>

                                        <NavDropdown title={<span>{login ? empData.last_name : ""} <MdKeyboardArrowDown /></span>} id="basic-nav-dropdown" className='nav-dropdown'>
                                            <NavDropdown title={<span>About <MdKeyboardArrowDown /></span>} className='subnav-dropdown'>
                                                <NavDropdown.Item className='subdropdown-link'>{empData.first_name } {empData.last_name}</NavDropdown.Item>
                                                <NavDropdown.Item className='subdropdown-link'>{empData.email}</NavDropdown.Item>
                                                <NavDropdown.Item className='subdropdown-link'>{empData.designation}</NavDropdown.Item>
                                                <NavDropdown.Item className='subdropdown-link'>{empData.phone}</NavDropdown.Item>
                                                <NavDropdown.Item className='subdropdown-link'>{empData.emp_id}</NavDropdown.Item>
                                            </NavDropdown>

                                            {
                                                empData.phone === "+919032330333" || empData.phone === "+917780199139" ? (
                                                    <NavDropdown.Item><Nav.Link as={Link} to='employeedashboard' className='dropdown-link' eventKey="6">Manage Employees</Nav.Link></NavDropdown.Item>
                                                ) : ""
                                            }

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
                    <Route path='/npeapplications' element={login ? <NPEApplications /> : <Navigate to='/login' />} />
                    <Route path='/npeapplicationsdashboard/:desc' element={login ? <NPEApplicationsDashboard /> : <Navigate to='/login' />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={login ? <Register /> : <Navigate to='/login' />} />
                    <Route path='/forgotpassword' element={<ForgotPassword />} />
                    <Route path='/updatepassword' element={login ? <UpdatePassword /> : <Navigate to='/login' />} />
                    <Route path='/pctpatentform' element={login ? <PCTPatentForm /> : <Navigate to='/login' />} />
                    <Route path='/employeedashboard' element={login ? <EmployeesDashboard /> : <Navigate to='/login' />} />
                    <Route path='/updateemployee/:id' element={login ? <UpdateEmployee /> : <Navigate to='/login' />} />
                    <Route path='/' element={login ? <Home /> : <Navigate to='/login' />} />
                    <Route path='*' element={<Error404 />} />
                </Routes>
            </div>

            <div>
                <Modal show={modal} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
                    <Modal.Header>
                        <Modal.Title className='Modal-header'><span>{login ? empData.last_name : ""},</span> Are you Sure you Want To Log Out?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button className = "close-button" onClick={handleClose}>close</Button>
                        <Button className='signout-modal-button' onClick={handleSignOut}><VscSignOut /> Yes, Logout</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                <Modal show={sessionTimeoutModal} onHide={handleSignOut} backdrop="static" keyboard={false} centered size='lg'>
                    <Modal.Header>
                        <Modal.Title className='session-timeout-header'>Your Session Expired</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className='session-timeout-msg'>Your session was expired. Please Login again to continue using the Cellix Bio MIS.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='signout-modal-session-button' onClick={handleSignOut}><VscSignIn /> Login, Again</Button>
                    </Modal.Footer>
                </Modal>    
            </div>
        </>
    );
}

export default NavBar;