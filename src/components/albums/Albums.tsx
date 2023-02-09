import { Stack } from "@mui/material";
import { Album } from "./Album";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { useLightBox } from "../../utils/hooks";

export const Albums = () => {
  const artists_ids = useSelector(
    (state: IRootState) => state.filterReducer.artists
  );

  const [containers, lightBoxies] = useLightBox();

  return (
    <div>
      <Stack spacing={2}>
        {artists_ids.map((artist_id: string) => {
          return (
            <Album
              containers={containers}
              lightBoxies={lightBoxies}
              key={artist_id}
              artist_id={artist_id}
            />
          );
        })}
      </Stack>
    </div>
  );
};
