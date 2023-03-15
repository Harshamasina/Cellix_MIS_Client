import { OverlayTrigger, Popover } from 'react-bootstrap';
import { MdOutlineNotifications } from 'react-icons/md';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';

const Notifications = () => {
    const img="https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/calender.jpg";
    const popover = (
        <Popover className='popover'>
          <Popover.Body as="h6" className='popover-msg'>Create Custom Notifications</Popover.Body>
        </Popover>
    );
    
    return(
        <div>
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>Cellix Bio MIS Notifications</h1>
                            <OverlayTrigger 
                            placement="bottom" 
                            delay={{ show: 250, hide: 400 }}
                            trigger={['hover', 'focus']}
                            overlay={popover}
                        >
                            <Link className='customNote-link' to="/customnotifications">
                                <MdOutlineNotifications />
                            </Link>
                        </OverlayTrigger>
                        </div>
                    </div>
                </div>
            </Parallax>
        </div>
    );
}

export default Notifications;