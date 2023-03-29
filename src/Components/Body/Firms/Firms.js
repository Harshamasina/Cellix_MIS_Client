import { Parallax } from 'react-parallax';
import FirmsTable from './FirmsTable';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Firms = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Office.jpg";
    return(
        <div>
            <Helmet>
                <title>Firms | MIS</title>
                <meta name="description" content="Cellix Bio MIS Application Firms Page"></meta>
            </Helmet>
            <Parallax bgImage={ img } strength={100} bgImageAlt="parallaximg">
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>Firms</h1>
                        </div>
                    </div>
                </div>
            </Parallax>
            
            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to='/home' className='BC-Links'>Home</Link>
                <Link to='/firms' className='BC-Links'>Firms</Link>
            </Breadcrumbs>

            <FirmsTable></FirmsTable>
        </div>
    );
}

export default Firms