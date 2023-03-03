import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Parallax } from 'react-parallax';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';

const AddNewNpe = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/Bar+Graphs.jpg";
    const { id } = useParams();
    const [NPEData, setNPEData] = useState([
        {
            npe_country: "",
            npe_appno: "",
            npe_dof: "",
            npe_firms: "",
            npe_fer_i: "",
            npe_fer_f: "",
            npe_us_fa: "",
            npe_us_foa: "",
            npe_us_soa: "",
            npe_us_rc: "",
            npe_us_rr: "",
            npe_in_appeal: "",
            npe_in_hearing: "",
            npe_in_ser: "",
            npe_ep_161: "",
            npe_ep_desc: "",
            npe_ep_pub: "",
            npe_ep_ser: "",
            npe_ep_tac: "",
            npe_ep_val: "",
            npe_grant: "",
            npe_patent: "",
            npe_if: "",
            npe_annuity: "",
            npe_rfe: ""
        }
    ]);
    const [patent, setPatent] = useState([]);

    const handleAddNPE = () => {
        setNPEData([...NPEData, {
            npe_country: "",
            npe_appno: "",
            npe_dof: "",
            npe_firms: "",
            npe_fer_i: "",
            npe_fer_f: "",
            npe_us_fa: "",
            npe_us_foa: "",
            npe_us_soa: "",
            npe_us_rc: "",
            npe_us_rr: "",
            npe_in_appeal: "",
            npe_in_hearing: "",
            npe_in_ser: "",
            npe_ep_161: "",
            npe_ep_desc: "",
            npe_ep_pub: "",
            npe_ep_ser: "",
            npe_ep_tac: "",
            npe_ep_val: "",
            npe_grant: "",
            npe_patent: "",
            npe_if: "",
            npe_annuity: "",
            npe_rfe: ""
        }])
    };
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitModal, setSubmitModal] = useState(false);

    const handleRemoveNPE = (index) => {
        const newNPEData = [...NPEData]
        newNPEData.splice(index, 1);
        setNPEData(newNPEData);
    }
    
    const handleInputs = (e, index) => {
        const {name, value} = e.target;
        const newNPEData = [...NPEData];
        newNPEData[index] = { ...newNPEData[index], [name]: value };
        setNPEData(newNPEData);
    };

    const handleNPEUpdate = (e) => {
        e.preventDefault();
        setSubmitModal(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/getpatentid/${id}`);
                setPatent(res.data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleSubmitModal = async () => {
        setError(null);
        setIsLoading(true);
        setIsLoading(false);
        try{
            const res = await axios.patch(`http://localhost:5000/api/addnewnpe/${id}`, { "npe": NPEData });
            console.log(res);
            setIsLoading(false);
            window.location.reload();
        } catch (err) {
            setError(err);
            console.log(err);
            setIsLoading(false);
        }
    }

    const handleCloseSubmitModal= () => {
        setSubmitModal(false);
    }
    return(
        <div>
           <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg">
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>{ patent && patent.ref_no } New NPE</h1>
                        </div>
                    </div>
                </div>
            </Parallax>
            <Breadcrumbs separator="\" className='bread-crumb'>
                <Link to="/home" className='BC-Links'>Home</Link>
                <Link to="/patents" className='BC-Links'>Patents Dashboard</Link>
                <Link to={"/patentinfo/"+patent.ref_no} className='BC-Links'>{patent.ref_no}</Link>
                <Link to={"/patentupdate/"+patent._id} className='BC-Links'>{patent.ref_no} Update</Link>
                <Link to={"/addnewnpe/"+patent._id} className='BC-Links'>{patent.ref_no} New NPE</Link>
            </Breadcrumbs>
            <div className="patentForm">
                <div className="content">
                    <form className="form">
                        {
                            NPEData.map((npeData, i) => (
                                <div className='patent-details' key={i}>
                                    <div className="input-box">
                                        <span className="details">NPE Country</span>
                                        <select 
                                            name="npe_country"
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                            <option defaultValue disabled>Select Country</option>
                                            <option value="US">United States (US)</option>
                                            <option value="US (DIV)">United States (US DIV)</option>
                                            <option value="AU">Australia (AU)</option>
                                            <option value="BR">Brazil (BR)</option>
                                            <option value="CA">Canada (CA)</option>
                                            <option value="CN">China (CN)</option>
                                            <option value="DK">Denmark (DK)</option>
                                            <option value="EP">Europe (EP)</option>
                                            <option value="IN">India (IN)</option>
                                            <option value="IL">Israel (IL)</option>
                                            <option value="JP">Japan (JP)</option>
                                            <option value="MX">Mexico (MX)</option>
                                            <option value="NZ">New Zealand (NZ)</option>
                                            <option value="RU">Russia (RU)</option>
                                            <option value="SG">Singapore (SG)</option>
                                            <option value="ZA">South Africa (ZA)</option>
                                            <option value="KR">South Korea (KR)</option>
                                            <option value="ES">Spain (ES)</option>
                                        </select>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Application Number</span>
                                        <input 
                                            type="text" 
                                            placeholder="Enter NPE Application Number"
                                            autoComplete="off"
                                            name="npe_appno"
                                            value={npeData.npe_appno}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Date of Filing</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Date of Filing"
                                            autoComplete="off"
                                            name="npe_dof"
                                            value={npeData.npe_dof}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Firms</span>
                                        <input 
                                            type="text" 
                                            placeholder="Enter NPE Firms"
                                            autoComplete="off"
                                            name="npe_firms"
                                            value={npeData.npe_firms}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE FER Issue Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE FER Issue Date"
                                            autoComplete="off"
                                            name="npe_fer_i"
                                            value={npeData.npe_fer_i}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE FER Final Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE FER Final Date"
                                            autoComplete="off"
                                            name="npe_fer_f"
                                            value={npeData.npe_fer_f}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">United States(US)</span>
                                        <span className="details">NPE First Office Action Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Request for Examination Date"
                                            autoComplete="off"
                                            name="npe_us_foa"
                                            value={npeData.npe_us_foa}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">United States(US)</span>
                                        <span className="details">NPE Second Office Action Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Second office Action"
                                            autoComplete="off"
                                            name="npe_us_soa"
                                            value={npeData.npe_us_soa}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">United States(US)</span>
                                        <span className="details">NPE request for Continuation</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Request for Continuation"
                                            autoComplete="off"
                                            name="npe_us_rc"
                                            value={npeData.npe_us_rc}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">United States(US)</span>
                                        <span className="details">NPE Response to Examination Report</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Response to Examination Report"
                                            autoComplete="off"
                                            name="npe_us_rr"
                                            value={npeData.npe_us_rr}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">United States(US)</span>
                                        <span className="details">NPE Final Action</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Final Action"
                                            autoComplete="off"
                                            name="npe_us_fa"
                                            value={npeData.npe_us_fa}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">India(IN)</span>
                                        <span className="details">NPE India Appeal Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Final Action"
                                            autoComplete="off"
                                            name="npe_in_appeal"
                                            value={npeData.npe_in_appeal}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">India(IN)</span>
                                        <span className="details">NPE India Hearing Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Hearing Date"
                                            autoComplete="off"
                                            name="npe_in_hearing"
                                            value={npeData.npe_in_hearing}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">India(IN)</span>
                                        <span className="details">NPE India Second Examination Report</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Hearing Date"
                                            autoComplete="off"
                                            name="npe_in_ser"
                                            value={npeData.npe_in_ser}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">Europe(EP)</span>
                                        <span className="details">NPE Rule 161</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Rule 161"
                                            autoComplete="off"
                                            name="npe_ep_161"
                                            value={npeData.npe_ep_161}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">Europe(EP)</span>
                                        <span className="details">NPE Europe Granted / Rejected</span>
                                        <select
                                            name="npe_ep_desc"
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                            <option defaultValue disabled>Select NPE Status</option>
                                            <option value="1">Granted</option>
                                            <option value="0">Rejected</option>
                                        </select>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">Europe(EP)</span>
                                        <span className="details">NPE claim to publication Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE claim to publication Date"
                                            autoComplete="off"
                                            name="npe_ep_pub"
                                            value={npeData.npe_ep_pub}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">Europe(EP)</span>
                                        <span className="details">NPE Europe Second Examination Report</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Europe Second Examination Report"
                                            autoComplete="off"
                                            name="npe_ep_ser"
                                            value={npeData.npe_ep_ser}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">Europe(EP)</span>
                                        <span className="details">NPE translation of accepted Claim </span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE translation of accepted claim "
                                            autoComplete="off"
                                            name="npe_ep_tac"
                                            value={npeData.npe_ep_tac}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">Europe(EP)</span>
                                        <span className="details">NPE Validation</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Validation"
                                            autoComplete="off"
                                            name="npe_ep_val"
                                            value={npeData.npe_ep_val}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Grant Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="NPE Grant Date"
                                            autoComplete="off"
                                            name="npe_grant"
                                            value={npeData.npe_grant}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Patent Number</span>
                                        <input 
                                            type="text" 
                                            placeholder="Enter NPE Patent Number"
                                            autoComplete="off"
                                            name="npe_patent"
                                            value={npeData.npe_patent}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Issue Fee Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Issue Fee Date"
                                            autoComplete="off"
                                            name="npe_if"
                                            value={npeData.npe_if}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Annuities Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Annuities Date"
                                            autoComplete="off"
                                            name="npe_annuity"
                                            value={npeData.npe_annuity}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>

                                    <div className="input-box">
                                        <span className="details">NPE Request for Examination Date</span>
                                        <input 
                                            type="date" 
                                            placeholder="Enter NPE Request for Examination Date"
                                            autoComplete="off"
                                            name="npe_rfe"
                                            value={npeData.npe_rfe}
                                            onChange={ (e) => handleInputs(e,i)}
                                        >
                                        </input>
                                    </div>
                                    {
                                        i > 0 && (
                                            <>
                                                <Button className=" m-lg-3 remove-npe" onClick={() => handleRemoveNPE(i)}>Remove NPE</Button>
                                            </>
                                        )
                                    }
                                </div>
                            ))
                        }
                        <Button className="add-npe" onClick={handleAddNPE}>Add NPE</Button>
                        <div className='button'>
                           <input type="submit" name="submit patent" value={ isLoading ? "Adding NEW NPE" : "Add NPE Country"} onClick={handleNPEUpdate}></input>
                        </div>
                        <Modal show={submitModal} onHide={handleCloseSubmitModal}>
                            <Modal.Header >
                                <Modal.Title className='Modal-title-pct'>Confirm Submission</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to submit the form? Please verify all data inserted correctly</Modal.Body>
                            <Modal.Footer>
                                <Button className='signout-modal-button' onClick={handleCloseSubmitModal}>Cancel</Button>
                                <Button className = "close-button" onClick={handleSubmitModal}>Submit</Button>
                            </Modal.Footer>
                        </Modal>
                        {error && <p className='error-message'>There was an error: {error.message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddNewNpe;