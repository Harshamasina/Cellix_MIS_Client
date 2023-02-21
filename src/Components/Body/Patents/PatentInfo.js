import axios from 'axios';
import { useState } from 'react';
import {useParams} from 'react-router-dom'

const PatentInfo = () => {
    const {ref} = useParams();
    const [patent, setPatent] = useState("");
    const fetchData = async () => {
        const patentData = await axios.get(`http://localhost:5000/api/getpatent/${ref}`);
        setPatent(patentData);
    }
    fetchData();
    console.log(patent);
    return(
        <div>
            <h1>Patent Info</h1>
        </div>
    );
}

export default PatentInfo;