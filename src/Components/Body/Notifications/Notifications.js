import { Parallax } from 'react-parallax';
// import NotificationTable from './NotificationTable';
import TestNotification from './TestNotification';

const Notifications = () => {
    const img="https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Notifications.jpg";
    return(
        <div>
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg" blur={1}>
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>Cellix Bio MIS Notifications</h1>
                        </div>
                    </div>
                </div>
            </Parallax>
            {/* <NotificationTable></NotificationTable> */}
            <TestNotification></TestNotification>
        </div>
    );
}

export default Notifications;