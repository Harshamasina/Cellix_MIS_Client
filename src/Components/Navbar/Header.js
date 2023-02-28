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
import Error404 from '../Body/error404';
import PatentUpdate from '../Body/Patents/PatentUpdate';
import MultiNPEForm from '../Body/NewPatents/MultiNPEForm';
import PCTPatentForm from '../Body/NewPatents/PCTPatentForm';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import Modal from 'react-bootstrap/Modal';
import ForgotPassword from '../Body/Login/ForgotPassword';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UpdatePassword from '../Body/Login/UpdatePassword';
import { MdKeyboardArrowDown } from "react-icons/md";

function NavBar(props) {
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
                setLogin(user);
                localStorage.setItem('login', JSON.stringify(login));
            });
            return () => handleLogIn();
        }, [login]);

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
                                            <Nav.Link className='navbar_link' as={Link} to="/patents" eventKey="1">Patents</Nav.Link>
                                            <Nav.Link className='navbar_link' as={Link} to="/firms" eventKey="2">Firms</Nav.Link>
                                            <Nav.Link className='navbar_link' as={Link} to="/newpatent" eventKey="3">New Entry</Nav.Link>
                                            <Nav.Link className='navbar_link' as={Link} to="/notifications" eventKey="4">Notifications</Nav.Link>
                                        </>
                                    )
                                }
                                <NavDropdown title={props.name ? (<span>{props.name} <MdKeyboardArrowDown /></span>) : ""} id="basic-nav-dropdown" className='nav-dropdown'>
                                    <NavDropdown.Item><Link className='dropdown-link'>About</Link></NavDropdown.Item>
                                    <NavDropdown.Item><Link to='updatepassword' className='dropdown-link'>Change Password</Link></NavDropdown.Item>
                                    {
                                        login ? ( <Button className='signout-button' onClick={handleShow}>Sign Out</Button> ) : (
                                            <Button className='signin-button' onClick={() => navigate('/login')}>Log In</Button>
                                        )
                                    }
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                
                <div>
                    <Routes>
                        <Route path='/home' element={login ? <Home /> : <Navigate to='/login' />}></Route>
                        <Route path='/patents' element={login ? <Patents /> : <Navigate to='/login' />}></Route>
                        <Route path='/newpatent' element={login ? <NewPatents /> : <Navigate to='/login' />}></Route>
                        <Route path='/firms' element={login ? <Firms /> : <Navigate to='/login' />}></Route>
                        <Route path='/notifications' element={login ? <Notifications /> : <Navigate to='/login' />}></Route>
                        <Route path='/patentinfo/:ref' element={login ? <PatentInfo /> : <Navigate to='/login' />}></Route>
                        <Route path='/patentupdate/:id' element={login ? <PatentUpdate /> : <Navigate to='/login' />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/register' element={<Register />}></Route>
                        <Route path='/forgotpassword' element={<ForgotPassword />} />
                        <Route path='/updatepassword' element={login ? <UpdatePassword /> : <Navigate to='/login' />} />
                        <Route path='/misform' element={login ? <MultiNPEForm /> : <Navigate to='/login' />}></Route>
                        <Route path='/pctpatentform' element={login ? <PCTPatentForm /> : <Navigate to='/login' />}></Route>
                        <Route path='/' element={login ? <Home /> : <Navigate to='/login' />}></Route>
                        <Route path='*' element={<Error404 />}></Route>
                    </Routes>
                </div>

                <div>
                    <Modal show={modal} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
                        <Modal.Header>
                            <Modal.Title className='Modal-header'><span>{props.name},</span> Are you Sure you Want To Log Out!</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button className = "close-button" onClick={handleClose}>close</Button>
                            <Button className='signout-modal-button' onClick={handleSignOut}>Yes, Logout</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </>
        );
    }
export default NavBar;
