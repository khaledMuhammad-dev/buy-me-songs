import { useDispatch, useSelector } from "react-redux";
import { ImageBox } from "../ImageBox";
import { IAppDispatch, IRootState } from "../../store";
import { fetchAlbums, selectArtistById } from "../../store/data/data.reducer";
import { artistAdded, artistRemoved } from "../../store/filters/filter.reducer";
export const Artist = (props: { artist_id: string, containers: any, lightBoxies: any }) => {
  const { artist_id, containers, lightBoxies } = props;
  const dispatch:IAppDispatch = useDispatch();

  const {name, images} = useSelector((state:IRootState) => selectArtistById(state, artist_id)) 
  const artistsFetchedBefore = useSelector((state:IRootState) => state.dataReducer.artistsCompeletedFetch);
  const filteredArtists = useSelector((state:IRootState) => state.filterReducer.artists);
  const isSelected = filteredArtists.findIndex(id => id === artist_id) > -1 ? true : false;


  const toggleArtist = () => {
    !isSelected ? dispatch(artistAdded(artist_id)) : dispatch(artistRemoved(artist_id))
  }

  const handleSelected = () => {
    
    toggleArtist()
    const isFetchedBefore = artistsFetchedBefore.indexOf(artist_id) > -1;
    if(isFetchedBefore) {
     console.log(`${ name }'s albums and tracks is alredy exists!`)
      return
    }

    console.log(`fetching ${name}'s albums and tracks`)
    dispatch(fetchAlbums(artist_id))
  }


  return (
    <>
      <ImageBox 
      containersRef={containers}
      lightBoxiesRef={lightBoxies}
      isSelected = { isSelected } 
      url = { images[0].url } 
      handleSelected = { handleSelected } /> 
    </>
  )
}
