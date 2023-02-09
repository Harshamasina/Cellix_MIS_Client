import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-content">
                <a href="https://www.cellixbio.com/"><img src="https://cellixbio-assets.s3.ap-south-1.amazonaws.com/Web+Images/CellixBio.Icon.png" alt="footer-logo"/></a>
                {/* <h3>Cellix Bio MIS</h3> */}
                <ul className="footer-links">
                    <Link to='/home'><li>HOME</li></Link>
                    <Link to='/patents'><li>PATENTS</li></Link>
                    <Link to='/firms'><li>FIRMS</li></Link>
                    <Link to='/login'><li>LOGIN</li></Link>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>copyright &copy; 2014 - 2023 Cellix Bio</p>
            </div>
        </div>
    );
}

export default Footer;