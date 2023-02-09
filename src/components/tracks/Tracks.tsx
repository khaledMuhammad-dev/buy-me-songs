import React from 'react'
import { AccordionC } from '../AccordionC'
import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { IRootState } from '../../store'
import {  selectArtistById, selectFilteredTracks } from '../../store/data/data.reducer'
import { SmallImageBox } from '../ImageBox'
import { FilterBar } from './FilterBar'
import { Track } from './Track'
import { selectTracksFilters } from '../../store/filters/filter.reducer'

export const Tracks = (props: {artist_id: string}) => {
  const { artist_id } = props;
  
  const selectedAlbums = useSelector((state:IRootState) => state.filterReducer.albums).filter(album => album.artist_id === artist_id);
  const {name, images} = useSelector((state:IRootState) => selectArtistById(state, artist_id));
  const items = useSelector((state:IRootState) => state.cartReducer.tracks)
  const filter = useSelector(selectTracksFilters).filter(filter => filter.artist_id === artist_id)[0]
  const value = filter ? filter : {artist_id, filterStatus: ""}
  const tracksFiltered = useSelector((state:IRootState) => selectFilteredTracks(state, value)) 

  console.log()
  return (
    <AccordionC summary = { <Summary name = {name} images = {images} /> }>
      <Stack spacing={2} sx={{maxHeight: "200px", overflowY: "auto"}}>
        <FilterBar 
        selectedAlbums = {selectedAlbums} 
        artist_id = {artist_id} 
        filterValue = {value.filterStatus} />

        {tracksFiltered.map(track => {
          const isSelected = items.findIndex(item => item.id === track.id) > -1
          
          return <Track key={track.id} track = { track } artistName={ name } isSelected={ isSelected }/>
        })}
        
      </Stack>
    </AccordionC>
  )
}

function Summary(props: any) {
  const {images, name} = props;
  return (
    <>
      <SmallImageBox url = {images[2].url} />
      <span>
        {name}
      </span>
    </>
  )
}

