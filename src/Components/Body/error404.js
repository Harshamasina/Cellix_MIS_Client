import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';

const Error404 = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Error+Page+404.jpg";
    return(
        <div>
            <Parallax bgImage={ img } strength={200} bgImageAlt="parallaximg">
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