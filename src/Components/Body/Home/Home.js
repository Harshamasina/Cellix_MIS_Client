import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import { MdOutlineSearch } from 'react-icons/md';
import { Helmet } from "react-helmet";

const Home = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Monitor.jpg";
    return(
        <div>
            <Helmet>
                <title>Home | MIS | Cellix Bio</title>
                <meta name="description" content="Cellix Bio MIS Application Home Page" />
            </Helmet>
            <Parallax bgImage={ img } strength={200} bgImageAlt="parallaximg">
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='HomePageContent'>
                            <h1>Welcome to Cellix Bio Management and Information Systems</h1>
                            <h2>For it's Application Families</h2>
                            <div className='homeBtn-container'><Link className='homeBtn' to="/patents"><MdOutlineSearch /> Search For Application Families</Link></div>
                        </div>
                    </div>
                </div>
            </Parallax>
        </div>
    );
}

export default Home;