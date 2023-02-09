import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { IRootState } from "..";
import { _getAlbums, _getArtists, _getToken, _getAlbumsAndTracks } from "../../api/requests";
import { structureAlbumsState, structureTracksState } from "../../utils/helpers";
import { IFilteredAlbums } from "../filters/filter.reducer";

const _fetchArtists = createAsyncThunk("artists/fetchedArtists", async () => {
    const token = await _getToken();
    const data = await _getArtists(token!, ["7vk5e3vY1uw9plTHJAMwjN", "5abSRg0xN1NV3gLbuvX24M", "64KEffDW9EtZ1y2vBYgq8T"]);

    let payload = {}
    data.artists.forEach(({ name, images, id }: any) => {
        payload = { ...payload, [id]: { name, images, id } }
    });

    return payload
});

const _fetchAlbums = createAsyncThunk("albums/fetchedAlbums", async (artist_id: string) => {
    const token = await _getToken();
    const data = await _getAlbums(token!, artist_id);
    const albums = await data.items.filter(({ album_type }: any) => album_type === "album")
    // prepar "Albums State"
    const albumsPayload = structureAlbumsState(albums, artist_id)

    const albums_ids = Object.keys(albumsPayload);
    const res = await _getAlbumsAndTracks(token!, albums_ids)
    const albumsWithTracks = res.albums;
    // prepar "Tracks State"
    const { tracksPayload, albumTracksPayload } = structureTracksState(albumsWithTracks, artist_id)

    return { tracksPayload, albumsPayload, albumTracksPayload, artist_id }
})

export interface IArtist {
    name: string,
    id: string,
    images: Array<{ hieght: number, url: string, width: string }>
}

export interface IAlbum {
    name: string,
    id: string,
    images: Array<{ hieght: number, url: string, width: string }>,
    total_tracks: string,
    artist_id: string
}

export interface ITrack {
    album_id: string,
    artist_id: string,
    name: string,
    id: string,
    track_number: number,
    duration_ms: number,
    images: Array<{ hieght: number, url: string, width: string }>,
    price: number
}

interface ITracksMapByAlbumId {
    [key: string]: Array<ITrack>
}

export interface IDataState {
    artists: {
        [key: string]: IArtist
    },
    albums: {
        [key: string]: IAlbum
    },
    tracks: {
        [key: string]: ITrack
    },
    albumTracks: ITracksMapByAlbumId,
    artistsCompeletedFetch: Array<string>,
    loading: string
}

const initialState = {
    artists: {},
    albums: {},
    tracks: {},
    albumTracks: {},
    artistsCompeletedFetch: [],
    loading: "fetching_artists"
} as IDataState

const dataSlice = createSlice({
    name: "refactoreData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(_fetchArtists.fulfilled, (state, action) => {
            state.artists = {
                ...state.artists,
                ...action.payload
            }

            state.loading = "idle"
        })

        builder.addCase(_fetchAlbums.fulfilled, (state, action) => {
            state.albums = {
                ...state.albums,
                ...action.payload.albumsPayload
            }

            state.tracks = {
                ...state.tracks,
                ...action.payload.tracksPayload
            }

            state.albumTracks = { ...state.albumTracks, ...action.payload.albumTracksPayload }

            state.artistsCompeletedFetch.push(action.payload.artist_id)
        })
    }
})

export const fetchArtists = _fetchArtists;
export const fetchAlbums = _fetchAlbums;
export const dataReducer = dataSlice.reducer;









/**
 * Selectors
 *
 */

// Artist Selectors
// ---------------- 
const selectAllArtists = (state: IRootState) => Object.values(state.dataReducer.artists);
export const selectArtistById = (state: IRootState, id: string) => state.dataReducer.artists[id];
export const selectArtistsIds = (state: IRootState) => Object.keys(state.dataReducer.artists)

// Albums Selectors
// ----------------
const selectAlbums = (state: IRootState) => Object.values(state.dataReducer.albums);
const selectAlbumById = (state: IRootState, id: string) => state.dataReducer.albums[id]
export const selectAlbumsByIds = (state: IRootState, ids: Array<{ id: string }>) => {
    return ids.map(album_id => selectAlbumById(state, album_id.id))
}

export const selectAlbumsByArtistId = (state: IRootState, artist_id: string) => {
    const artistAlbums = selectAlbums(state).filter(album => {
        return album.artist_id === artist_id
    })

    return artistAlbums
}

// Tracks Selectors
// ----------------
const selectAllTracks = (state: IRootState) => Object.values(state.dataReducer.tracks)
const selectTrackById = (state: IRootState, id: string) => state.dataReducer.tracks[id]

const selectTracksByAlbumId = (state: IRootState, album_id: string) => {
    return state.dataReducer.albumTracks[album_id];
}

export const selectTracksByAlbumsIds = (state: IRootState, ids: Array<{ id: string }>) => {
    let tracks: Array<ITrack> = []
    ids.forEach(album_id => {
        tracks = [...tracks, ...selectTracksByAlbumId(state, album_id.id)]
    })

    return tracks
}

export const selectSelectedTracksByArtistId = (state: IRootState, artist_id: string) => {
    return state.cartReducer.tracks.map(track => track.artist_id === artist_id)
}

export const getAlumsTracksByMapping = ( tracksMapByAlubmId: ITracksMapByAlbumId, filters: Array<IFilteredAlbums> ) => {
    let tracks: Array<ITrack> = []
    filters.forEach(filter => {
        tracks = [...tracks, ...tracksMapByAlubmId[filter.id]]
    })

    return tracks
}

export const selectFilteredTracks = createSelector(
    (state:IRootState) => state.dataReducer.albumTracks,
    (state:IRootState) => state.cartReducer.tracks,
    (state:IRootState) => state.filterReducer.albums,
    (state:IRootState, filter: {artist_id:string, filterStatus: string}) => filter,

    (tracksMapByAlbumId, selectedtracks, filteredAlbums, filter) => {
        if(filter.filterStatus === "")  {
            const artistAlbumsIds = filteredAlbums.filter(filteredAlbum => filteredAlbum.artist_id === filter.artist_id )
            return getAlumsTracksByMapping(tracksMapByAlbumId, artistAlbumsIds)
            
        }

        if(filter.filterStatus === "selected") {
            return selectedtracks.filter(track => track.artist_id === filter.artist_id)
        }
        
        return tracksMapByAlbumId[filter.filterStatus]
    }
    
)