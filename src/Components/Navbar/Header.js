import { Navbar, Nav } from 'react-bootstrap';
import { Link, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from "../Body/Home/Home";
import Patents from "../Body/PatentsLifeCycle/Patents";
import Firms from "../Body/Firms/Firms";
import Login from "../Body/Login/Login";
import Logo from './Logo';
import './Header.css';
import NewPatents from '../Body/NewPatents/NewPatents';


function NavBar() {
        const [changeNavbar, setChangeNavbar] = useState(false);
        const changeBackground = () => {
            if(window.scrollY >= 80){
                setChangeNavbar(true);
            }else{
                setChangeNavbar(false);
            }
        }
        window.addEventListener('scroll', changeBackground);
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
                                <Nav.Link className='navbar_link' as={Link} to="/home" eventKey="0">Home</Nav.Link>
                                <Nav.Link className='navbar_link' as={Link} to="/patents" eventKey="1">Patents</Nav.Link>
                                <Nav.Link className='navbar_link' as={Link} to="/newpatent" eventKey="2">New Entry</Nav.Link>
                                <Nav.Link className='navbar_link' as={Link} to="/firms" eventKey="3">Firms</Nav.Link>
                                <Nav.Link className='navbar_link' as={Link} to="/login" eventKey="4">Login</Nav.Link>
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
                        <Route path='/login' element={<Login></Login>}></Route>
                    </Routes>
                </div>
            </>
        );
    }
export default NavBar;
