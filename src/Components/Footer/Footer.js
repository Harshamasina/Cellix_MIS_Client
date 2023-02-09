import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';

const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-content">
                <a href="https://www.cellixbio.com/"><img src="https://cellixbio-assets.s3.ap-south-1.amazonaws.com/Web+Images/CellixBio.Icon.png" alt="footer-logo"/></a>
                {/* <h3>Cellix Bio MIS</h3> */}
                <ul className="footer-links">
                    <li><Nav.Link className='navbar_link' as={Link} to="/home" eventKey="0">Home</Nav.Link></li>
                    <li><Nav.Link className='navbar_link' as={Link} to="/patents" eventKey="1">Patents</Nav.Link></li>
                    <li><Nav.Link className='navbar_link' as={Link} to="/firms" eventKey="2">Firms</Nav.Link></li>
                    <li><Nav.Link className='navbar_link' as={Link} to="/login" eventKey="3">Login</Nav.Link></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>copyright &copy; 2014 - 2023 Cellix Bio</p>
            </div>
        </div>
    );
}

export default Footer;