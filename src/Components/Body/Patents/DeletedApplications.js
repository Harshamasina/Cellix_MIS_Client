import { Parallax } from 'react-parallax';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';

const deletedApplications = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/trends+1.jpg";
    return(
        <div>
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='UpdatePageContent'>
                            <h1>Deleted Application Families</h1>
                        </div>
                    </div>
                </div>
            </Parallax>
            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to="/home" className='BC-Links'>Home</Link>
                <Link to="/patents" className='BC-Links'>Application Dashboard</Link>
                <Link to="/deletedapplications" className='BC-Links'>Deleted Application Families</Link>
            </Breadcrumbs>
        </div>
    );
}

export default deletedApplications;