import { Parallax } from 'react-parallax';

const Home = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Brain.jpg";
    return(
        <div>
            <div>
                <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                    <div className='ParallaxContainer'>
                        <div className="ParallaxDiv">
                            <div className='HomePageContent'>
                                <h1>Cellix Bio Management Information Systems</h1>
                                <h2>For it's Intellectual Property</h2>
                            </div>
                        </div>
                    </div>
                </Parallax>
            </div>
        </div>
    );
}

export default Home;