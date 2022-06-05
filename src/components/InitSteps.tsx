import React, { FC } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

type InitStepsProps = {
  activeStep: number;
  steps: { label: string }[];
};
export const InitSteps: FC<InitStepsProps> = ({ steps, activeStep }) => (
  <Stepper activeStep={activeStep} alternativeLabel>
    {steps.map((el) => (
      <Step key={el.label}>
        <StepLabel>{el.label}</StepLabel>
      </Step>
    ))}
  </Stepper>
);
