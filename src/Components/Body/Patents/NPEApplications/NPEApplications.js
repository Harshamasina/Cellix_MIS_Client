import { Parallax } from 'react-parallax';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const NPEApplications = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Report.jpg";
    const data = [
        {
            sno: 1,
            grant_desc_code: 1,
            grant_desc: "Granted"
        },
        {
            sno: 2,
            grant_desc_code: 2,
            grant_desc: "Lapsed"
        },
        {
            sno: 3,
            grant_desc_code: 4,
            grant_desc: "Under examination"
        },
        {
            sno: 4,
            grant_desc_code: 3,
            grant_desc: "Abandoned"
        },
        {
            sno: 5,
            grant_desc_code: 0,
            grant_desc: "Rejected"
        },
    ];

    return(
        <div>
            <Helmet>
                <title>NPE Applications | MIS</title>
                <meta name="description" content="Cellix Bio MIS NPE Applications Families page"></meta>
            </Helmet>

            <Parallax bgImage={ img } strength={150} bgImageAlt="parallaximg">
                <div className='ParallaxContainer'>
                    <div className="ParallaxDiv">
                        <div className='UpdatePageContent'>
                            <h1>NPE Applications</h1>
                            <div className='npe-links'>
                                {
                                    data.map((desc, index) => (
                                        <Link key={index} className='npe-link' to={"/npeapplicationsdashboard/"+desc.grant_desc_code}>{desc.grant_desc}</Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Parallax>
        </div>
    );
};

export default NPEApplications;