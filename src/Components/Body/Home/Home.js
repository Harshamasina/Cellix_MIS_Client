import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';

const Home = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Monitor.jpg";
    return(
        <div>
            <div>
                <Parallax bgImage={ img } strength={200} bgImageAlt="parallaximg">
                    <div className='ParallaxContainer'>
                        <div className="ParallaxDiv">
                            <div className='HomePageContent'>
                                <h1>Welcome to Cellix Bio Management and Information Systems</h1>
                                <h2>For it's Application Families</h2>
                                <div className='homeBtn-container'><Link className='homeBtn' to="/patents">Search For Application Families</Link></div>
                            </div>
                        </div>
                    </div>
                </Parallax>
            </div>
        </div>
    );
}

export default Home;