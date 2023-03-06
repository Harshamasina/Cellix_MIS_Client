import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import ApplicationFamily from './ApplicationFamily';

const NewPatents = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/update.jpg";
    return(
        <div>
            <Parallax bgImage={ img } strength={200} bgImageAlt="parallaximg">
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='new-entry'>
                            <h1>New International Patent or New MIS Reference Number Entry</h1>
                            <div className='new-entry-links justify-content-center'>
                                <Link className='entry-link' to='/pctpatentform'>New Patent</Link>
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