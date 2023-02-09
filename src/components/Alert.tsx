import { Alert } from "@mui/material";
import React from "react";

const styles = {
  position: "absolute",
  left: "1rem",
  top: "1rem",
  maxWidth: "100%",
  zIndex: "2",
};

export const CustomAlert: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Alert severity="error" sx={styles}>
      {children}
    </Alert>
  );
};
