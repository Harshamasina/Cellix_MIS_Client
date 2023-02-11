import { useState } from "react";
import Select from 'react-select';

const PatentLifeCycleForm = () => {
    const data = [
        {
            value: "US",
            label: "United States"
        },
        {
            value: "AU",
            label: "Australia (AU)"
        },
        {
            value: "BR",
            label: "Brazil (BR)"
        },
        {
            value: "CA",
            label: "Canada (CA)"
        },
        {
            value: "CN",
            label: "China (CN)"
        },
        {
            value: "EP",
            label: "Europe (EP)"
        },
        {
            value: "IN",
            label: "India (IN)"
        },
        {
            value: "IL",
            label: "Israel (IL)"
        },
        {
            value: "JP",
            label: "Japan (JP)"
        },
        {
            value: "MX",
            label: "Mexico (MX)"
        },
        {
            value: "NZ",
            label: "New Zealand (NZ)"
        },
        {
            value: "RU",
            label: "Russia (RU)"
        },
        {
            value: "SG",
            label: "Singapore (SG)"
        },
        {
            value: "ZA",
            label: "South Africa (ZA)"
        },
        {
            value: "KR",
            label: "South Korea (KR)"
        },
    ]
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
        npe_country: [],
        npe_appno: "",
        npe_dof: "",
        npe_firms: "",
        // npe_invoice: "",
        // npe_ph: "",
        npe_fer_i: "",
        npe_fer_f: "",
        npe_grant: "",
        npe_patent: "",
        npe_if: "",
        npe_annuity: "" 
    });
    const [country, setCountry] = useState([]); 
    let name, value;
    const handleInputs = (e) => {
        // console.log(e);
        name=e.target.name;
        value=e.target.value;
        setPatent({...patent, [name]:value});
    };
    const handleChange = (e) => {
        setCountry(Array.isArray(e) ? e.map(x => x.value) : []);
    }
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
                        <div className="patent-details">
                            <div className="input-box">
                                <span className="details">NPE Application Number</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter NPE Application Number"
                                    autoComplete="off"
                                    name="npe_appno"
                                    value={patent.npe_appno}
                                    onChange={handleInputs}
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
                                    value={patent.npe_dof}
                                    onChange={handleInputs}
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
                                    value={patent.npe_firms}
                                    onChange={handleInputs}
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
                                    value={patent.npe_fer_i}
                                    onChange={handleInputs}
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
                                    value={patent.npe_fer_f}
                                    onChange={handleInputs}
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
                                    value={patent.npe_grant}
                                    onChange={handleInputs}
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
                                    value={patent.npe_patent}
                                    onChange={handleInputs}
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
                                    value={patent.npe_if}
                                    onChange={handleInputs}
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
                                    value={patent.npe_annuity}
                                    onChange={handleInputs}
                                >
                                </input>
                            </div>

                            {/* <div className="input-box">
                                <span className="details">NPE Invoice</span>
                                <input 
                                    type="file" 
                                    placeholder="Enter NPE Invoice"
                                    multiple
                                    autoComplete="off"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">NPE Prosecution history</span>
                                <input 
                                    type="file"
                                    multiple
                                    placeholder="Enter NPE Prosecution history"
                                    autoComplete="off"
                                >  
                                </input>
                            </div> */}

                            {/* <div className="select-box">
                                <span className="details">NPE Country</span>
                                <select 
                                    multiple={true}
                                    name="npe_country"
                                    value={patent.npe_country}
                                    onChange={handleInputs}
                                >
                                    <option defaultValue disabled>Select Country</option>
                                    <option value="US">United States (US)</option>
                                    <option value="AU">Australia (AU)</option>
                                    <option value="BR">Brazil (BR)</option>
                                    <option value="CA">Canada (CA)</option>
                                    <option value="CN">China (CN)</option>
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
                                </select>
                            </div> */}
                            <Select
                                placeholder="Select Country"
                                value={data.filter(obj => country.includes(obj.value))}
                                options={data}
                                onChange={handleChange}
                                isMulti
                                isClearable
                            >
                            </Select>
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