import React from "react";
import { Button } from "@mui/material";

const NPEStep = () => {
    return(
        <div>
            <div className="prvForm">
                <div className="content">
                    <form method="#" className="prvform">
                        <div className="prv-details">
                            <div className="input-box">
                                <span className="details">NPE Application Number</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter NPE Application Number"
                                    autoComplete="off"
                                    name="npe_appno"
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
                                >
                                </input>
                            </div>
                            <Button variant="contained" color="success">Finish</Button>
                        </div>    
                    </form>
                </div>
            </div>
        </div>
    );
}
export default NPEStep;