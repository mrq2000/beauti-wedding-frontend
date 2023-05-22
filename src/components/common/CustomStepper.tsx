import React, { FC, useMemo, useState } from 'react';
import { Stepper, Step, StepLabel, StepIconProps } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(95deg, #162f4d 0%,#1f306e 50%,#637cd6 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(95deg, #162f4d 0%,#1f306e 50%,#637cd6 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(160deg, #162f4d 0%,#1f306e 50%,#637cd6 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient(160deg, #162f4d 0%,#1f306e 50%,#637cd6 100%)',
  }),
}));

interface Step {
  label: string;
  icon: React.ReactElement;
}

interface ICustomStepper {
  steps: Step[];
  currentStep: number;
}
const CustomStepper: FC<ICustomStepper> = ({ steps, currentStep }) => {
  const ColorlibStepIcon = useMemo(() => {
    const test = ({ active, completed, className, icon }: StepIconProps) => {
      const currentIndex = +String(icon) - 1;
      return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
          {steps[currentIndex]?.icon}
        </ColorlibStepIconRoot>
      );
    };
    return test;
  }, [steps]);

  return (
    <Stepper alternativeLabel activeStep={currentStep} connector={<ColorlibConnector />}>
      {steps.map((step) => (
        <Step key={step.label}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomStepper;
