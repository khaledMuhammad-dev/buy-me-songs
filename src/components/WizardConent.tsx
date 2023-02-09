import React from "react";
import { Typography } from "@mui/material";
import { Wrapper } from "./Wrapper";
import { useSelector } from "react-redux";
import { selectCurrentTitle } from "../store/ui/ui.reducer";

interface Props {
  children: React.ReactNode;
}

const styles = {
  fontWeight: "700",
  color: "#7188A4",
  padding: "1.5rem",
  transform: "translateY(-16px)",
  position: "sticky",
  top: "0",
  background: "#0E1E30",
  zIndex: "1",
};

export const WizardConent: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <StepTitle />
      {children}
    </Wrapper>
  );
};

const StepTitle = () => {
  const title = useSelector(selectCurrentTitle);
  
  return (
    <Typography variant="h2" sx={styles}>
      {title}
    </Typography>
  );
};
