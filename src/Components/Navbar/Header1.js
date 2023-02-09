import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import './Header1.css';
import { Link, Routes, Route } from "react-router-dom";
import Home from "../Body/Home/Home";
import Patents from "../Body/PatentsLifeCycle/Patents";
import Firms from "../Body/Firms/Firms";
import Login from "../Body/Login/Login";
import Register from "../Body/Register/Register";

const Header1 = () => {
    const navRef = useRef();
    const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

    return(
        <div>
            <header>
                <Link to="/home"><img src="https://cellixbio-assets.s3.ap-south-1.amazonaws.com/Web+Images/CellixBio.Icon.png" alt="logo"/></Link>
                <nav ref={navRef}>
                    <Link to="/home">Home</Link>
                    <Link to="/patents">Patents</Link>
                    <Link to="/firms">Firms</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <button
                        className="nav-btn nav-close-btn"
                        onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </nav>
                <button className="nav-btn" onClick={showNavbar}>
                    <FaBars />
                </button>
		    </header>
            <div>
                <Routes>
                    <Route path='/home' element={<Home></Home>}></Route>
                    <Route path='/patents' element={<Patents></Patents>}></Route>
                    <Route path='/firms' element={<Firms></Firms>}></Route>
                    <Route path='/login' element={<Login></Login>}></Route>
                    <Route path='/register' element={<Register></Register>}></Route>
                </Routes>
            </div>
        </div>
    );
}
export default Header1;