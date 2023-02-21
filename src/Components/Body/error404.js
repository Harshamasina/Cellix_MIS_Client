import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';

const Error404 = () => {
    const img  = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/404+Error+MIS+(4).jpg";
    return(
        <div>
            <Parallax bgImage={ img } strength={200} bgImageAlt="parallaximg" blur={1}>
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                           <Link to="/" className='error404-Link'>Go To Home</Link>
                        </div>
                    </div>
                </div>
            </Parallax>
        </div>
    );
}

export default Error404;