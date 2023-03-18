import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import PatentDashboard from './PatentsDashboard';
import SearchPatents from './SearchPatents';
import { Breadcrumbs } from '@mui/material';
import { MdOutlineBackup } from 'react-icons/md';

const Patents = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Bar+Graphs.jpg";
    return(
        <div>
            <Parallax bgImage={ img } strength={150} bgImageAlt="parallaximg">
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>Cellix Bio Application Families</h1>
                            <Link className='customNote-link' to="/deletedapplications"><MdOutlineBackup /></Link>
                        </div>
                    </div>
                </div>
            </Parallax>
            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to="/home" className='BC-Links'>Home</Link>
                <Link to="/patents" className='BC-Links'>Application Dashboard</Link>
            </Breadcrumbs>
            <SearchPatents></SearchPatents>
            <PatentDashboard></PatentDashboard>
        </div>
    );
}

export default Patents;