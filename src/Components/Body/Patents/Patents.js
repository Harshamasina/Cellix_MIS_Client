import { Parallax } from 'react-parallax';

const Patents = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Home+Page.jpg";
    return(
        <div>
            <Parallax bgImage={ img } strength={200} bgImageAlt="parallaximg" blur={2}>
                    <div className='ParallaxContainer'>
                        <div className="ParallaxDiv">
                            <div className='FirmPageContent'>
                                <h1>Cellix Bio Patents</h1>
                            </div>
                        </div>
                    </div>
                </Parallax>
        </div>
    );
}
export default Patents;