import { Parallax } from 'react-parallax';
// import NotificationTable from './NotificationTable';

const Notifications = () => {
    const img="https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/calender.jpg";
    return(
        <div>
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>Cellix Bio MIS Notifications</h1>
                        </div>
                    </div>
                </div>
            </Parallax>
            {/* <NotificationTable></NotificationTable> */}
        </div>
    );
}

export default Notifications;