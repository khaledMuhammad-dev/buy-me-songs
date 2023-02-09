import React from "react";
import { Button } from "@mui/material";


interface IWizardButton {
  children: React.ReactNode;
  buttonProps: {
    [key:string]: any
  };
}

export const WizardButton: React.FC<IWizardButton> = (props) => {
  const { children, buttonProps } = props;

  return (
    <Button
      size="large"
      {...buttonProps}
      className={"Button wizard_button"}
    >
      {children}
    </Button>
  );
};
