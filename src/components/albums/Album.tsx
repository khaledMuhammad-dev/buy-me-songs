import React from "react";
import { AccordionC } from "../AccordionC";
import { Stack } from "@mui/material";
import { IRootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { ImageBox, SmallImageBox, TinyImageBox } from "../ImageBox";
import {
  selectAlbumsByArtistId,
  IAlbum,
  selectArtistById,
} from "../../store/data/data.reducer";
import { albumRemoved, albumAdded } from "../../store/filters/filter.reducer";

interface AlbumProps {
  artist_id: string;
  containers: any,
  lightBoxies: any
}



export const Album: React.FC<AlbumProps> = (props) => {
  const { artist_id, containers, lightBoxies } = props;
  const albums = useSelector((state: IRootState) =>
    selectAlbumsByArtistId(state, artist_id)
  );

  const artist = useSelector((state: IRootState) =>
    selectArtistById(state, artist_id)
  );

  const selectedAblums = useSelector(
    (state: IRootState) => state.filterReducer.albums
  );

  const dispatch = useDispatch();

  const handleSelected = (id: string, isSelected: boolean) => {
    !isSelected ? dispatch(albumAdded({ id, artist_id })) : dispatch(albumRemoved({ id, artist_id }))
  };

  return (
    <AccordionC
      summary={
        <Summary artistName={artist.name} artistImage={artist.images[2].url} />
      }
    >
      <Stack direction="row" spacing={3} sx={{ overflowX: "auto" }}>
        {albums.map((album: IAlbum) => {
          const isSelected =
            selectedAblums.findIndex(
              (selectedAlbum) => selectedAlbum.id === album.id
            ) > -1
              ? true
              : false;
          return (
            <ImageBox
              containersRef={containers}
              lightBoxiesRef={lightBoxies}
              key={album.id}
              url={album.images[0].url}
              handleSelected={() => handleSelected(album.id, isSelected)}
              isSelected={isSelected}
            />
          );
        })}
      </Stack>
    </AccordionC>
  );
};

interface SummerProps {
  artistName: string;
  artistImage: string;
}

const Summary: React.FC<SummerProps> = ({ artistName, artistImage }) => {
  return (
    <>
      <SmallImageBox url = {artistImage} />
      <span>{artistName}</span>
    </>
  );
};
