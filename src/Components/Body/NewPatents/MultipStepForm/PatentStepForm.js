import NPEStep from "./NPEStep";
import PCTStep from "./PCTStep";
import PRVStep from "./PRVStep";
import { Stepper, StepLabel, Step } from "@mui/material";

const PatentStepForm = () => {
    const showStep = (step) => {
        switch(step){
            case 1:
                return <PRVStep />
            case 2:
                return <PCTStep />
            case 3:
                return <NPEStep />
            default:
                return <PRVStep />
        }
    }
    return(
        <div>
            <div className="center-stepper">
                <Stepper style={{width: '30%'}} activeStep= '1' orientation="horizontal">
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                </Stepper>
            </div>
            {showStep(1)}
        </div>
    );
}
export default PatentStepForm;