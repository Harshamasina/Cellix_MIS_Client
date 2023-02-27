import { Parallax } from 'react-parallax';

const Firms = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/search+1.jpg";
    return(
        <div>
            <div>
                <Parallax bgImage={ img } strength={100} bgImageAlt="parallaximg">
                    <div className='ParallaxContainer'>
                        <div className="ParallaxDiv">
                            <div className='FirmPageContent'>
                                <h1>Firms</h1>
                            </div>
                        </div>
                    </div>
                </Parallax>
            </div>
        </div>
    );
}
export default Firms