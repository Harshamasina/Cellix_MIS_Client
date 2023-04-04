import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import ApplicationFamily from './ApplicationFamily';
import { MdOutlineCopyright } from 'react-icons/md';
import { Helmet } from 'react-helmet';
import { OverlayTrigger, Popover } from 'react-bootstrap';
 
const NewPatents = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/update.jpg";

    const PopoverDeletedApplications = (
        <Popover className='popover'>
          <Popover.Body as="p" className='popover-msg'>Add New International Patent</Popover.Body>
        </Popover>
    );

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
                                {/* <Link className='entry-link' to='/pctpatentform'>New Patent<sup><MdOutlineCopyright /></sup></Link> */}
                                <OverlayTrigger 
                                placement="bottom" 
                                delay={{ show: 250, hide: 400 }}
                                trigger={['hover', 'focus']}
                                overlay={PopoverDeletedApplications}
                                >
                                    <Link className='firm-link' to="/pctpatentform"><MdOutlineCopyright /></Link>
                                </OverlayTrigger>
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