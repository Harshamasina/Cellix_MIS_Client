import { useEffect, useState } from "react";
import { Parallax } from 'react-parallax';
import { Helmet } from "react-helmet";
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";

const UserMessages = () => {
    const img="https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/helpdesk.jpg";
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/getusers`);
                setMessages(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response.data.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if(loading){
        return <div>
            <Dna
                visible={true}
                height="20%"
                width="20%"
                ariaLabel="dna-loading"
                wrapperClass='dna-wrapper'
                wrapperStyle={{marginLeft: '40%', marginTop: '7%'}}
            />
        </div>;
    };

    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    };

    return(
        <div>
            <Helmet>
                <title>User Messages | MIS</title>
                <meta name="description" content="Cellix Bio MIS Application User Messages"></meta>
            </Helmet>

            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>User Queries</h1>
                            <h4>Messages Received: {messages && messages.length}</h4>
                        </div>
                    </div>
                </div>
            </Parallax>

            <div className='message-container'>
                <div className='box-container'>
                    {
                        messages && messages.map((message, index) => (
                            <div className='box' key={index}>
                                <h3>{message.name}</h3>
                                <h3>Email: <span className="message-span">{message.email}</span></h3>
                                <h3>Phone: <span className="message-span">{message.phone}</span></h3>
                                <h3>Subject: <span className="message-span">{message.subject}</span></h3>
                                <h3>Received At: <span className="message-span">
                                        {new Date(message.createdAt).getDate().toString().padStart(2, '0')}-
                                        {(new Date(message.createdAt).getMonth()+1).toString().padStart(2, '0')}-
                                        {new Date(message.createdAt).getFullYear().toString()}, {new Date(message.createdAt).getHours().toString().padStart(2, '0')}:
                                        {new Date(message.createdAt).getMinutes().toString().padStart(2, '0')}
                                    </span>
                                </h3>
                                <Accordion defaultActiveKey="0" className='mb-4'>
                                    <Accordion.Item>
                                        <Accordion.Header>Click to see message from {message.name}</Accordion.Header>
                                        <Accordion.Body>
                                            <span className="message-span">
                                                {message.message}
                                            </span>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default UserMessages;