import { Parallax } from 'react-parallax';
import { useState } from 'react';
import axios from 'axios';

const PCTPatentForm = () => {
    const img = "https://cellix-bio-mis.s3.ap-south-1.amazonaws.com/web+assets/last+man+standing.jpg";
    const [PCTPatent, setPCTPatent] = useState({
        wno: "",
        pct: "",
        year: "",
        publication_date:"",
        therapeutic_area: "",
        diseases: "",
        formula: "",
        claims: "",
        compounds: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);

    let name, value;
    let handleInputs = (e) => {
        name=e.target.name;
        value = e.target.value;
        setPCTPatent({...PCTPatent, [name]:value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmissionError(null);
        try{
            const res = await axios.post('/api/pctpatent', PCTPatent);
            console.log(res);
            setPCTPatent({
                wno: "",
                pct: "",
                year: "",
                publication_date:"",
                therapeutic_area: "",
                diseases: "",
                formula: "",
                claims: "",
                compounds: ""
            });
            alert('Patent Submitted Successfully');
            window.location.reload();
        } catch (err) {
            console.log(err);
            setSubmissionError(err.response.data.message);
        } finally {
            setSubmitting(false);
        }
    }

    return(
        <div>
            <Parallax bgImage={ img } strength={300} bgImageAlt="parallaximg" blur={5}>
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='FirmPageContent'>
                            <h1>International Patent Form</h1>
                        </div>
                    </div>
                </div>
            </Parallax>
            <div className='PCT-Container'>
                <form onSubmit={handleSubmit} className='PCTform'>
                    <input 
                        type="text" 
                        placeholder='Enter WIPO Number *'
                        autoComplete="off"
                        name= "wno"
                        value={PCTPatent.wno}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="text" 
                        placeholder='Enter PCT or Application Number *'
                        autoComplete="off"
                        name= "pct"
                        value={PCTPatent.pct}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="text" 
                        placeholder='Enter Published Year *'
                        autoComplete="off"
                        name= "year"
                        value={PCTPatent.year}
                        onChange={handleInputs}
                    >
                    </input>
                    <input 
                        type="text" 
                        placeholder='Enter Publishing Date (dd.mm.yyyy) *'
                        autoComplete="off"
                        name= "publication_date"
                        value={PCTPatent.publication_date}
                        onChange={handleInputs}
                    >
                    </input>
                    <textarea 
                        placeholder='Enter Therapeutic Area *'
                        name="therapeutic_area"
                        value={PCTPatent.therapeutic_area}
                        onChange={handleInputs}
                    >
                    </textarea>
                    <textarea 
                        placeholder='Enter Diseases *'
                        name= "diseases"
                        value={PCTPatent.diseases}
                        onChange={handleInputs}
                    >
                    </textarea>
                    <textarea 
                        placeholder='Enter Formulas Image Links ( Upload Images in s3 and then paste each link line wise )'
                        name= "formula"
                        value={PCTPatent.formula}
                        onChange={handleInputs}
                    >
                    </textarea>
                    <textarea 
                        placeholder='Enter Claims text or Image Links ( Upload Images in s3 and then paste each link line wise )'
                        name= "claims"
                        value={PCTPatent.claims}
                        onChange={handleInputs}
                    >
                    </textarea>
                    <textarea 
                        placeholder='Enter Compounds Image Links ( Upload Images in s3 and then paste each link line wise )'
                        name= "compounds"
                        value={PCTPatent.compounds}
                        onChange={handleInputs}
                    >
                    </textarea>
                    <input 
                        type="submit" 
                        className="pctbutton" 
                        value={submitting ? 'Submitting...' : 'Submit'}
                        disabled={submitting}
                    >
                    </input>
                    {submissionError && <p className='error-message'>{submissionError}</p>}
                </form>
            </div>
        </div>
    );
}
export default PCTPatentForm;