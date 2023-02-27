import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import GoToTop from "./GoToTop";

const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-content">
                <a href="https://www.cellixbio.com/"><img src="https://cellixbio-assets.s3.ap-south-1.amazonaws.com/Web+Images/CellixBio.Icon.png" alt="footer-logo"/></a>
                <ul className="footer-links">
                    <li><Nav.Link className='navbar_link' as={Link} to="/home" eventKey="0">Home</Nav.Link></li>
                    <li><Nav.Link className='navbar_link' as={Link} to="/patents" eventKey="1">Patents</Nav.Link></li>
                    <li><Nav.Link className='navbar_link' as={Link} to="/firms" eventKey="2">Firms</Nav.Link></li>
                    <li><Nav.Link className='navbar_link' as={Link} to="/notifications" eventKey="3">Notifications</Nav.Link></li>
                    <li><Nav.Link className='navbar_link' as={Link} to="/login" eventKey="4">Login</Nav.Link></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>copyright &copy; 2014 - 2023 Cellix Bio</p>
            </div>
            <GoToTop></GoToTop>
        </div>
    );
}

export default Footer;