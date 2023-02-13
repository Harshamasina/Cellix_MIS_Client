// import PatentLifeCycleForm from "./PatentLifeCycleForm";
import { Parallax } from 'react-parallax';
import MultiNPEForm from './MultiNPEForm';

const NewPatents = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Policy.jpg";
    return(
        <div>
            <div>
                <Parallax bgImage={ img } strength={200} bgImageAlt="parallaximg" blur={2}>
                    <div className='ParallaxContainer'>
                        <div className="ParallaxDiv">
                            <div className='FirmPageContent'>
                                <h1>Patent Life Cycle Entry Form</h1>
                            </div>
                        </div>
                    </div>
                </Parallax>
            </div>
            {/* <PatentLifeCycleForm></PatentLifeCycleForm> */}
            <MultiNPEForm></MultiNPEForm>
        </div>
    );
}
export default NewPatents;