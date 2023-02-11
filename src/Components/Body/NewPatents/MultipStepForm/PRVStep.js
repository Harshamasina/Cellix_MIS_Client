import React from "react";
import { Button } from "@mui/material";

const PRVStep = () => {
    return(
        <div>
            <div className="prvForm">
                <div className="content">
                    <form method="#" className="prvform">
                        <div className="prv-details">
                            <div className="input-box">
                                <span className="details">Reference Number</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter Reference Number"
                                    autoComplete="off"
                                    name="ref_no"
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
                                >
                                </input>
                            </div>
                            <Button variant="contained" color="success">Next</Button>
                        </div>    
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PRVStep;