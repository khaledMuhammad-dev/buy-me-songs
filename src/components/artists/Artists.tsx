import { Grid } from "@mui/material";
import { Artist } from "./Artist";
import { useSelector } from "react-redux";
import { selectArtistsIds } from "../../store/data/data.reducer";
import { useLightBox } from "../../utils/hooks";

export const Artists = () => {
  const artists_ids = useSelector(selectArtistsIds);
  const [containers, lightBoxies] = useLightBox();

  return (
    <Grid container spacing={2} justifyContent="center">
       {artists_ids.map((artist_id: any) => {
          return <Artist containers={containers} lightBoxies={lightBoxies} key={artist_id} artist_id = {artist_id} />;
        })}
    </Grid>
  );
};
