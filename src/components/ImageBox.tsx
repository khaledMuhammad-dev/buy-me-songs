import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import styles from "@styles/ImageBox.module.scss";
import { BsCheck2 } from "react-icons/bs";

interface IProps {
  children?: React.ReactNode;
  url: string;
  isSelected: boolean;
  handleSelected: () => void;
  lightBoxiesRef: any,
  containersRef: any
}

export const ImageBox: React.FC<IProps> = (props) => {
  const { url, isSelected, handleSelected, containersRef, lightBoxiesRef } = props;
  const { selected, box, light, check_icon, checked } = styles;

  return (
    <Grid item>
      <div
        ref={el => containersRef.current.push(el)}
        className={isSelected ? `${selected} ${box}` : box}
        onClick={handleSelected}
        style={{
          width: "13.063rem",
          height: "13.063rem",
          marginBottom: "1rem",
          padding: "none",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        <img
          style={{ width: "100%", borderRadius: ".75rem" }}
          src={url}
          alt="artist"
        />
        <span className={light} ref={el => lightBoxiesRef.current.push(el)}></span>
        
        <span className={isSelected ? `${check_icon} ${checked}` : check_icon}>
          <BsCheck2 />
        </span>
      </div>
    </Grid>
  );
};

interface IImageUrl {
  url: string;
}

export const medium: React.FC<IImageUrl> = ({ url }) => {
  return (
    <Box sx={{ width: "39px", height: "39px" }}>
      <img style={{ width: "100%" }} src={url} alt="artist" />
    </Box>
  );
};

export const SmallImageBox: React.FC<IImageUrl> = ({ url }) => {
  return (
    <Box
      sx={{
        width: "25px",
        height: "25px",
        marginRight: "8px",
      }}
    >
      <img style={{ width: "100%" }} src={url} alt="artist" />
    </Box>
  );
};

export const TinyImageBox: React.FC<IImageUrl> = ({ url }) => {
  return (
    <Box
      sx={{
        width: "15px",
        height: "15px",
        marginRight: "8px",
      }}
    >
      <img style={{ width: "100%" }} src={url} alt="artist" />
    </Box>
  );
};
