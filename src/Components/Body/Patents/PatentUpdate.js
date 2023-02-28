import { Parallax } from 'react-parallax';

const PatentUpdate = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/checklist+1.jpg";
    return(
        <div>
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>Patent Update</h1>
                        </div>
                    </div>
                </div>
            </Parallax>
        </div>
    );
}
export default PatentUpdate;