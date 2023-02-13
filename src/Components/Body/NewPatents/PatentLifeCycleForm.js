import { useState } from "react";

const PatentLifeCycleForm = () => {
    const [patent, setPatent] = useState({
        ref_no: "",
        prv_dof: "",
        prv_appno: "",
        pct_dl: "",
        pct_dof: "",
        pct_appno: "",
        pct_isa: "",
        pct_18: "",
        pct_22_md: "",
        pct_30_31: "",
    }); 
    let name, value;
    const handleInputs = (e) => {
        // console.log(e);
        name=e.target.name;
        value=e.target.value;
        setPatent({...patent, [name]:value});
    };
    console.log(patent);
    // console.log(country);
    return(
        <div>
            <div className="patentForm">
                <div className="content">
                    <form method="#" className="form">
                        <div className="patent-details">
                            <div className="input-box">
                                <span className="details">Reference Number</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter Reference Number"
                                    autoComplete="off"
                                    name="ref_no"
                                    value={patent.ref_no}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PRV Date of Filing</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PRV Date of Filing"
                                    autoComplete="off"
                                    name="prv_dof"
                                    value={patent.prv_dof}
                                    onChange={handleInputs}
                                    min="1997-01-01" max="2030-12-31"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PRV Application Number</span>
                                <input 
                                    type="text" 
                                    placeholder="PRV Application Number"
                                    autoComplete="off"
                                    name="prv_appno"
                                    value={patent.prv_appno}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT Deadline</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Deadline"
                                    autoComplete="off"
                                    name="pct_dl"
                                    value={patent.prv_dl}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT Date of Filing</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Date of Filing"
                                    autoComplete="off"
                                    name="pct_dof"
                                    value={patent.pct_dof}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT Number</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter PCT Number"
                                    autoComplete="off"
                                    name="pct_appno"
                                    value={patent.pct_appno}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT ISA Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT ISA Date"
                                    autoComplete="off"
                                    name="pct_isa"
                                    value={patent.pct_isa}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT Publication Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Publication Date"
                                    autoComplete="off"
                                    name="pct_18"
                                    value={patent.pct_18}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT Month Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Month Date"
                                    autoComplete="off"
                                    name="pct_22_md"
                                    value={patent.pct_22_24}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT 30/31 Date</span>
                                <input 
                                    type="date" 
                                    placeholder="PCT 30/31 Date"
                                    autoComplete="off"
                                    name="pct_30_31"
                                    value={patent.pct_30_31}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>
                        </div>
                        <div className="button">
                            <input 
                                type="submit"
                                name="Register Patent"
                                value="Register Patent"
                            >
                            </input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PatentLifeCycleForm;