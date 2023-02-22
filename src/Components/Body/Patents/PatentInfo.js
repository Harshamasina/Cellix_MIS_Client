import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { Parallax } from 'react-parallax';

const PatentInfo = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/lock.jpg";
    const {ref} = useParams();
    const [patent, setPatent] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const patentData = await axios.get(`http://localhost:5000/api/getpatent/${ref}`);
            setPatent(patentData.data);
        }
        fetchData();
    }, [ref]);
    console.log(patent);
    return(
        <div>
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg" blur={3}>
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>{patent.ref_no}</h1>
                        </div>
                        <Link className='patentinfo-link'>Edit {patent.ref_no}</Link>
                    </div>
                </div>
            </Parallax>
        </div>
    );
}

export default PatentInfo;