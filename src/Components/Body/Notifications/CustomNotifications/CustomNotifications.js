import { Parallax } from 'react-parallax';
import { OverlayTrigger, Popover, Table } from 'react-bootstrap';
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0, MdOutlineEditNotifications, MdOutlineNotificationsActive } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteCustomNotif from './DeleteCustomNotif';
import { Breadcrumbs } from '@mui/material';
import { Helmet } from 'react-helmet';

const CustomNotifications = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Todos.jpg";
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://misbackend.cellixbio.info/api/getcnotifications');
                setNotifications(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response.data.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const changeColor = (days) => {
        try {
            if (days >= 0 && days <= 3) {
              return 'red-notification';
            } else if (days > 3 && days <= 15) {
                return 'orange-notification';
            } else if (days < 0) {
              return 'grey-notification';
            } else {
                return 'black';
            }
        } catch (err) {
            console.error(err);
        }
    };

    if(loading){
        return <div>
            <Dna
                visible={true}
                height="20%"
                width="20%"
                ariaLabel="dna-loading"
                wrapperClass='dna-wrapper'
                wrapperStyle={{marginLeft: '40%', marginTop: '7%'}}
            />
        </div>;
    };

    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    };

    const popover = (
        <Popover className='popover'>
          <Popover.Body as="span" className='popover-msg'>Create Custom Notifications</Popover.Body>
        </Popover>
    );

    const updatePopover = (
        <Popover id="update-popover">
            <Popover.Body as="span" className='popover-msg'>update notification</Popover.Body>
        </Popover>
    );

    return(
        <div>
            <Helmet>
                <title>Custom Notifications | MIS</title>
                <meta name="description" content="Cellix Bio MIS Application Custom Notifications"></meta>
            </Helmet>
            
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>Custom Notifications</h1>
                            <OverlayTrigger 
                                placement="top" 
                                trigger={['hover', 'focus']}
                                overlay={popover}
                            >
                            <Link className='create-customNote-link' to="/createnotifications">
                                <MdOutlineNotificationsActive />
                            </Link>
                        </OverlayTrigger>
                        </div>
                    </div>
                </div>
            </Parallax>

            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to='/home' className='BC-Links'>Home</Link>
                <Link to='/notifications' className='BC-Links'>Notifications</Link>
                <Link t0='/customnotifications' className='BC-Links'>Custom Notifications</Link>
            </Breadcrumbs>

            <Table striped hover responsive className='mt-3 shadow-lg notification-table'>
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>Reference Number</th>
                        <th>Field</th>
                        <th>Date</th>
                        <th style={{ width: '45%' }}>Description</th>
                        <th>Days Left</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        notifications.map((notification, index) => (
                            <tr key={notification._id}>
                                <td>{index + 1}</td>
                                <td><Link className='reference-links' to={"/patentinfo/"+notification.ref_no} target="_blank">{notification.ref_no}</Link></td>
                                <td>{notification.field}</td>
                                <td>{notification.date}</td>
                                <td>{notification.descp}</td>
                                <td className={changeColor(notification.daysLeft)}>{notification.daysLeft}</td>
                                <td>
                                    <OverlayTrigger trigger={['hover', 'focus']} placement="auto" overlay={updatePopover}>
                                        <Link to={"/updatenotifications/"+notification._id} className="update-notification">
                                            <MdOutlineEditNotifications />
                                        </Link>
                                    </OverlayTrigger>
                                    {notification.daysLeft <= 0 ? (<div className="delete-notification"><DeleteCustomNotif notificationId = {notification._id} /></div>) : ""}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default CustomNotifications;