import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "..";

export interface IFilter {
    artist_id: string,
    filterStatus: string
}

export interface IFilteredAlbums {
    id: string,
    artist_id: string
}

interface IFilterState {
    artists: Array<string>,
    albums: Array<IFilteredAlbums>,
    filteredTracks: Array<IFilter>
}

const initialState = {
    artists: [],
    albums: [],
    filteredTracks: []
} as IFilterState


const fliterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        artistAdded: (state, action) => {
            state.artists.push(action.payload)
        },
        artistRemoved: (state, action) => {
            state.artists = state.artists.filter(artist_id => artist_id !== action.payload)
            state.albums = state.albums.filter(album => album.artist_id !== action.payload)
        },
        albumAdded: (state, action) => {
            state.albums.push(action.payload)
        },
        albumRemoved: (state, action) => {
            state.albums = state.albums.filter(album => album.id !== action.payload.id)
            // remove tracks
        },
        tracksFiltered: (state, action) => {
            if (action.payload.filterStatus === "") {
                state.filteredTracks = state.filteredTracks.filter(filter => filter.artist_id !== action.payload.artist_id)
                return
            }
            const filterIndex = state.filteredTracks.findIndex(filter => filter.artist_id === action.payload.artist_id)

            if (filterIndex > -1) {
                state.filteredTracks[filterIndex].filterStatus = action.payload.filterStatus;
                return;
            }

            state.filteredTracks.push(action.payload)
        }
    },
    extraReducers: {
        "orders/ordered/fulfilled": (state) => {
            state.artists = []
            state.albums = []
            state.filteredTracks = []
        }
    }
});

export const { artistAdded, artistRemoved, albumAdded, albumRemoved, tracksFiltered } = fliterSlice.actions;
export const filterReducer = fliterSlice.reducer;



export const countOfSelectedArtists = (state: IRootState) => state.filterReducer.artists.length
export const countOfSelectedAlbums = (state: IRootState) => state.filterReducer.albums.length

export const selectTracksFilters = (state: IRootState) => state.filterReducer.filteredTracks