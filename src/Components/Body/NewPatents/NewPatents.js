import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import ApplicationFamily from './ApplicationFamily';
import { MdOutlineCopyright } from 'react-icons/md';
import { Helmet } from 'react-helmet';
 
const NewPatents = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/update.jpg";
    return(
        <div>
            <Helmet>
                <title>New Application Family | MIS</title>
                <meta name="description" content="Cellix Bio MIS Application new application family entry"></meta>
            </Helmet>
            <Parallax bgImage={ img } strength={200} bgImageAlt="parallaximg">
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='new-entry'>
                            <h1>New Application Family Entry</h1>
                            <div className='new-entry-links justify-content-center'>
                                <Link className='entry-link' to='/pctpatentform'>New Patent<sup><MdOutlineCopyright /></sup></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Parallax>
            <ApplicationFamily></ApplicationFamily>
        </div>
    );
}

export default NewPatents;