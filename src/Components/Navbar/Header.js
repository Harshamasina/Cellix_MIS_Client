import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import { useEffect } from 'react';
import HamburgerMenu from 'react-hamburger-menu';

const Header = () => {
    const [onScroll, setOnScroll] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            setOnScroll(window.scrollY > 50);
        });
    }, []);
    return(
        <div>
            <Navbar
                bg={onScroll ? 'dark' : 'light'}
                variant={onScroll ? 'dark' : 'light'} 
                expand="md"
                style={{width: '100%', position: 'fixed', zIndex: 100}}
                className={`main-header ${onScroll ? 'on-scroll-header' : ''}`}
                onToggle={() => setMenuOpen(!menuOpen)}
            >
                <Container>
                    <Navbar.Brand href="#home"> 
                        Cellix Bio MIS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar" bsPrefix="navbar-toggler hamburger-menu">
                        <HamburgerMenu
                            isOpen={menuOpen}
                            menuClicked={() => null}
                            width={30}
                            height={25}
                            strokeWidth={1.5}
                            rotate={0}
                            color={onScroll ? 'white' : 'black'}
                            borderRadius={0}
                            animationDuration={0.6}
                        />  
                    </Navbar.Toggle>
                    <Navbar.Collapse id='navbar'>
                        <Nav className="ms-auto">
                            <Nav.Link href='#home'>HOME</Nav.Link>
                            <Nav.Link href='#patent'>PATENTS</Nav.Link>
                            <Nav.Link href='#firms'>FIRMS</Nav.Link>
                            <Nav.Link href='#login'>LOGIN</Nav.Link>
                            <Nav.Link href='#Register'>REGISTER</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;