import React, { FC } from "react";

import { makeStyles } from "@mui/styles";

import { Container, D12 } from "./MyHTML";
import { InitSteps } from "./InitSteps";
import { InitNavButtons } from "./InitNavButtons";

const useStyles = makeStyles(() => ({
  stepComponent: {
    width: "100%",
    overflow: "auto",
    height: "calc(100vh - 221px)",
  },
}));

type Step = {
  label: string;
  component: FC;
};

type InitProps = {
  onNext: () => void;
  onBack: () => void;
  activeStep: number;
  steps: Step[];
};

export const Init: FC<InitProps> = ({ activeStep, steps, onNext, onBack }) => {
  const classes = useStyles();
  const CurrentStepComponent = steps[activeStep].component;

  return (
    <Container>
      <D12>
        <InitSteps steps={steps} activeStep={activeStep} />
      </D12>
      <div className={classes.stepComponent}>
        <CurrentStepComponent />
      </div>

      <D12>
        <InitNavButtons
          onBack={onBack}
          onNext={onNext}
          activeStep={activeStep}
          stepsLen={steps.length}
        />
      </D12>
    </Container>
  );
};
