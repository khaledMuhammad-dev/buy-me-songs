import React from "react";

const styleChip = {
  padding: "2px 6px",
  background: "#7188A4",
  color: "#0B1928",
  fontWeight: "700",
  borderRadius: "4px",
  fontSize: "10px",
  textDecoration: "none",
  transition: "all 300ms ease"
};

interface Props {
  children: React.ReactNode,
  chipProps?: {
    [key: string]: any
  }
}
export const CustomChip: React.FC<Props> = ({ children, chipProps }) => {

  
  return (
    <a
    {...chipProps}
      href="/#"
      style={styleChip}
    >
      {children}
    </a>
  );
};




// 