import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

interface Props {
  summary: React.ReactNode;
  children: React.ReactNode;
}

export const AccordionC: React.FC<Props> = ({ children, summary }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === "panel"}
      onChange={handleChange("panel")}
      sx={{
        background: "#0b1928",
      }}
    >
      <AccordionSummary
        aria-controls="panel-album"
        id="panel-album"
        sx={{
          color: "white",
          height: "30px",
          borderRadius: "12px",
        }}
      >
        {summary}
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
