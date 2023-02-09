const PatentLifeCycleForm = () => {
    return(
        <div>
            <div className="patentForm">
                <div className="title">Patent Life Cycle Entry Form</div>
                <div className="content">
                    <form method="#" className="form">
                        <div className="patent-details">
                            <div className="input-box">
                                <span className="details">Reference Number</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter Reference Number"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PRV Date of Filing</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PRV Date of Filing"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PRV Application Number</span>
                                <input 
                                    type="text" 
                                    placeholder="PRV Application Number"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PRV Deadline</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PRV Deadline"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT Date of Filing</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT Date of Filing"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT Number</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter PCT Number"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT ISA Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT ISA Date"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT 18 Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT 18 Date"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT 22/24 Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter PCT 22/24 Date"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">PCT 30/31 Date</span>
                                <input 
                                    type="date" 
                                    placeholder="PCT 30/31 Date"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">NPE Application Number</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter NPE Application Number"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">NPE Date of Filing</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter NPE Date of Filing"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">NPE Firms</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter NPE Firms"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">NPE FER Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter NPE FER Date"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">NPE Grant Date</span>
                                <input 
                                    type="date" 
                                    placeholder="NPE Grant Date"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">NPE Patent Number</span>
                                <input 
                                type="text" 
                                placeholder="Enter NPE Patent Number"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">NPE Issue Fee Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter NPE Issue Fee Date"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">NPE Annuities Date</span>
                                <input 
                                    type="date" 
                                    placeholder="Enter NPE Annuities Date"
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">NPE Invoice</span>
                                <input 
                                    type="file" 
                                    placeholder="Enter NPE Invoice"
                                    multiple
                                >
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">NPE Prosecution history</span>
                                <input 
                                    type="file"
                                    multiple
                                    placeholder="Enter NPE Prosecution history"
                                >  
                                </input>
                            </div>

                            <div className="input-box">
                                <span className="details">NPE Country</span>
                                <select name="NPE Country" multiple>
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
                            </div>
                        </div>
                        <div className="button">
                            <input type="submit" value="Register Patent"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PatentLifeCycleForm;