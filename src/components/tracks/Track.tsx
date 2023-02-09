import { Box, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggledTrack } from "../../store/cart/cart.reducer";
import { ITrack } from "../../store/data/data.reducer";
import { songDurationFormate } from "../../utils/helpers";
import { SmallImageBox } from "../ImageBox";
import styles from "@styles/Tracks.module.scss";
import { BsCheck2 } from "react-icons/bs";

interface ArtistTrackProps {
  track: ITrack;
  artistName: string;
  isSelected: boolean;
}

const { track, selected, cirlce } = styles;

export const Track: React.FC<ArtistTrackProps> = (props) => {
  const {
    track: { name, duration_ms, images, track_number },
    artistName,
    isSelected,
  } = props;
  const duration = songDurationFormate(duration_ms);
  const dispatch = useDispatch();

  return (
    <div
      role="button"
      style={{ textDecoration: "none", marginRight: "0.5rem" }}
      onClick={() => dispatch(toggledTrack(props.track))}
    >
      <div className={isSelected ? `${track} ${selected}` : track}>
        <SmallImageBox url={images[2].url} />

        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ marginLeft: "12px" }}
        >
          <div className={cirlce}>{isSelected ? <BsCheck2 /> : track_number}</div>

          <Box>
            <Typography
              component="p"
              sx={{ textAlign: "start", color: "white" }}
            >
              {name}
            </Typography>
            <Typography
              component="p"
              sx={{
                color: "#7188A4",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              {artistName}
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            fontSize: "14px",
            marginLeft: "auto",
            color: "white",
          }}
        >
          {duration}
        </Box>
      </div>
    </div>
  );
};
