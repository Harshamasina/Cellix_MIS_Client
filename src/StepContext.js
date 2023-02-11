import React from "react";
import { useState } from "react";
import App from './App';

export const multiStepContext = React.createContext();
const StepContext = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [patentData, setPatentData] = useState([]);
    const [finalData, setFinalData] = useState([]);
    
    return(
        <div>
            <multiStepContext.Provider 
                value={
                    {
                        currentStep, 
                        setCurrentStep, 
                        patentData, 
                        setPatentData, 
                        finalData, 
                        setFinalData
                    }
                }
            >
            <App />
            </multiStepContext.Provider>
        </div>
    );
}

export default StepContext;