import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { selectAlbumsByIds } from "../../store/data/data.reducer";
import { tracksFiltered } from "../../store/filters/filter.reducer";
import { CustomChip } from "../Chip";
import { TinyImageBox } from "../ImageBox";
import styles from "@styles/Tracks.module.scss";

const { selected_filter } = styles;

export function FilterBar(props: any) {
  const { selectedAlbums, artist_id, filterValue } = props;
  const allChipClasses = filterValue === "" ? selected_filter : "";
  const selectedChipClasses = filterValue === "selected" ? selected_filter : "";

  const albums = useSelector((state: IRootState) =>
    selectAlbumsByIds(state, selectedAlbums)
  );

  const dispatch = useDispatch();
  const handleFilter = (filterStatus: string) => {
    dispatch(tracksFiltered({ artist_id, filterStatus }));
  };

  return (
    <Stack direction="row" spacing={1}>
      <CustomChip
        chipProps={{
          onClick: () => handleFilter(""),
          className: allChipClasses,
        }}
      >
        All
      </CustomChip>

      <CustomChip
        chipProps={{
          onClick: () => handleFilter("selected"),
          className: selectedChipClasses,
        }}>
        Selected
      </CustomChip>

      <Stack direction="row" spacing={1}>
        {albums.map(({ name, id, images }) => (
          <CustomChip
            key={id}
            chipProps={{
              onClick: () => handleFilter(id),
              className: filterValue === id ? selected_filter : "",
            }}
          >
            <Stack direction="row" spacing={1}>
              <TinyImageBox url={images[2].url} /> {name}
            </Stack>
          </CustomChip>
        ))}
      </Stack>
    </Stack>
  );
}
