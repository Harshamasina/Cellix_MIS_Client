import { OverlayTrigger, Popover } from 'react-bootstrap';
import { MdOutlineNotifications } from 'react-icons/md';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import PCTNotifications from './PCTNotifications';
import NPENotifications from './NPENotifications';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Notifications = () => {
    const img="https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/calender.jpg";
    const popover = (
        <Popover className='popover'>
          <Popover.Body as="h6" className='popover-msg'>Custom Notifications</Popover.Body>
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

            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to='/home' className='BC-Links'>Home</Link>
                <Link to='/notifications' className='BC-Links'>Notifications</Link>
            </Breadcrumbs>

            <Tabs defaultActiveKey="pct" id="uncontrolled-tab-example" className="mb-3 Tabs" fill>
                <Tab eventKey="pct" title="PCT Notifications" tabClassName='tab-item'>
                    <PCTNotifications />
                </Tab>
                <Tab eventKey="npe" title="NPE Notifications" tabClassName='tab-item'>
                    <NPENotifications />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Notifications;