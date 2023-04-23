import { OverlayTrigger, Popover } from 'react-bootstrap';
import { MdOutlineNotifications } from 'react-icons/md';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import PCTNotifications from './PCTNotifications';
import NPENotifications from './NPENotifications';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Helmet } from 'react-helmet';
import CustomNotificationTable from './CustomNotificationTable';

const Notifications = () => {
    const img="https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/calender.jpg";
    const popover = (
        <Popover className='popover'>
          <Popover.Body as="h6" className='popover-msg'>Custom Notifications</Popover.Body>
        </Popover>
    );
    
    return(
        <div>
            <Helmet>
                <title>PCT, NPE Notifications | MIS</title>
                <meta name="description" content="Cellix Bio MIS Application PCT, NPE, Custom and Custom notifications"></meta>
            </Helmet>
            
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
                            <Link className='firm-link' to="/customnotifications">
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
                <Tab eventKey="custom" title="Custom Notifications" tabClassName='tab-item'>
                    <CustomNotificationTable />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Notifications;