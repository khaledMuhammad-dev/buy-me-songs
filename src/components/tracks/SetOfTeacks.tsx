import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { Tracks } from './Tracks'
import { IRootState } from '../../store'

export const SetOfTeacks = () => {
  const selectedArtists = useSelector((state:IRootState) => state.filterReducer.artists);
  const selectedAlbums = useSelector((state:IRootState) => state.filterReducer.albums);
  const artistsHaveAlbumsSelected = selectedArtists.filter(artist_id => {
    const isExistAtLeastOne = selectedAlbums.findIndex(album => album.artist_id === artist_id);
    return isExistAtLeastOne > -1 ? true : false; 
  })

  return (
    <Stack spacing={2}>
      {artistsHaveAlbumsSelected.map(artist_id => {
        return <Tracks key = {artist_id} artist_id = {artist_id} />
      })}
    </Stack>
  )
}
