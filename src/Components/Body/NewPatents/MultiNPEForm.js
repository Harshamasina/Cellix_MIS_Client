import { useState } from "react";
import { Button } from "@mui/material";

const MultiNPEForm = () => {
    const [NPEData, setNPEData] = useState([{
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
    }]);
    const [PRVPCTData, setPRVPCTData] = useState({
        ref_no: "",
        prv_dof: "",
        prv_appno: "",
        pct_dof: "",
        pct_appno: "",
        pct_isa: "",
        pct_18: "",
        pct_22_md: "",
        pct_30_31: "",
        pct_dl: "",
        npe: NPEData
    });

    const handleInputs = (e, index) => {
        const {name, value} = e.target;
        const data = [...NPEData];
        data[index][name] = value;
        setNPEData(data);
        console.log(PRVPCTData);
        setPRVPCTData({...PRVPCTData.ref_no, ...PRVPCTData.prv_dof, ...PRVPCTData.prv_appno, ...PRVPCTData.pct_isa, 
            ...PRVPCTData.pct_dof, ...PRVPCTData.pct_appno, ...PRVPCTData.pct_18, ...PRVPCTData.pct_22_md, 
            ...PRVPCTData.pct_30_31, ...PRVPCTData.pct_dl, npe: data})
        
        console.log(PRVPCTData);
    }

    const handleRemove = index => {
        const list=[...NPEData];
        list.splice(index,1);
        setNPEData(list);
    }

    const handleClick = () => {
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
        }]);
    }

    let pname, pvalue;
    const handlepInputs = (e) => {
        pname=e.target.name;
        pvalue=e.target.value;
        setPRVPCTData({...PRVPCTData, [pname]:pvalue});
    };
    
    // console.log(PRVPCTData);
    // console.log(NPEData);

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
                                    value={PRVPCTData.ref_no}
                                    onChange={handlepInputs}
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
                                    value={PRVPCTData.prv_dof}
                                    onChange={handlepInputs}
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
                                    value={PRVPCTData.prv_appno}
                                    onChange={handlepInputs}
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
                                    value={PRVPCTData.pct_dof}
                                    onChange={handlepInputs}
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
                                    value={PRVPCTData.pct_appno}
                                    onChange={handlepInputs}
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
                                    value={PRVPCTData.pct_isa}
                                    onChange={handlepInputs}
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
                                    value={PRVPCTData.pct_18}
                                    onChange={handlepInputs}
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT 22 Month Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Month Date"
                                    autoComplete="off"
                                    name="pct_22_md"
                                    value={PRVPCTData.pct_22_24}
                                    onChange={handlepInputs}
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
                                    value={PRVPCTData.pct_30_31}
                                    onChange={handlepInputs}
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
                                    value={PRVPCTData.prv_dl}
                                    onChange={handlepInputs}
                                >
                                </input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            { 
                NPEData.map( (x,i) => {
                return(
                    <div>
                        <div className="patentForm">
                            <div className="content">
                                <form method="#" className="form">
                                    <div className="patent-details">
                                        <div className="input-box">
                                            <span className="details">NPE Country</span>
                                            <select 
                                                name="npe_country"
                                                onChange={ e => handleInputs(e,i)}
                                            >
                                                <option defaultValue disabled>Select Country</option>
                                                <option value="US">United States (US)</option>
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
                                            >
                                            </input>
                                        </div>

                                        <div className="input-box">
                                            <span className="details">Europe(EP)</span>
                                            <span className="details">NPE Europe Granted / Rejected</span>
                                            <select
                                                name="npe_ep_desc"
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
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
                                                onChange={ e => handleInputs(e,i)}
                                            >
                                            </input>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div>
                            {
                                NPEData.length!==1 &&
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    onClick = {() => handleRemove(i)}
                                    className="mx-lg-2"
                                >
                                Remove NPE Country
                                </Button>
                            }
                            { 
                                NPEData.length - 1 === i &&
                                <Button 
                                    variant="contained"  
                                    color="success" 
                                    onClick = { handleClick }
                                    className="m-lg-3"
                                >
                                Add NEW NPE Country
                                </Button>
                            }
                        </div>
                    </div>
                    );
                } )
            }
                <div className="button">
                    <input 
                        type="submit"
                        name="Register Patent"
                        value="Register Patent"
                    >
                    </input>
                </div>
        </div>
    );
}

export default MultiNPEForm;