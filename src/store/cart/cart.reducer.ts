import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "..";
import { ITrack } from "../data/data.reducer";

interface IUser {
    name: string,
    email: string,
    mobile: string
}

interface ICartState {
    user: IUser,
    tracks: Array<ITrack>,
    total: number,
    count: number

}

const initialState = {
    user: {
        name: "",
        mobile: "",
        email: "",
    },
    tracks: [],
    total: 0,
    count: 0
} as ICartState


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggledTrack: (state, action) => {
            const isTrackExist = state.tracks.findIndex(track => track.id === action.payload.id) > -1

            if (isTrackExist) {
                state.tracks = state.tracks.filter(track => track.id !== action.payload.id)
                state.count -= 1;
                state.total -= action.payload.price
                return
            }

            state.tracks.push(action.payload)
            state.count += 1;
            state.total += action.payload.price
            state.total = Number(state.total.toFixed(2))
        },
        userDataChanged: (state, action) => {
            const { field, value } = action.payload;

            state.user[field as keyof IUser] = value
        },
    },
    extraReducers: {
        "filter/artistRemoved": (state, action) => {
            state.tracks = state.tracks.filter(track => track.artist_id !== action.payload)
            state.total = state.tracks.reduce((acc, track) => acc + track.price, 0)
            state.count = state.tracks.length

        },
        "filter/albumRemoved": (state, action) => {
            state.tracks = state.tracks.filter(track => track.album_id !== action.payload.id)
            state.total = state.tracks.reduce((acc, track) => acc + track.price, 0)
            state.count = state.tracks.length

        },
        "orders/ordered/fulfilled": (state) => {
            console.log("cart state should be updated",state)
            state.user = initialState.user
            state.count = 0
            state.total =  0
            state.tracks = []
        }
    }
})


export const { toggledTrack, userDataChanged } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

/**
 * Selectors
 * 
 */

export const selectCount = (state: IRootState) => state.cartReducer.count
export const selectTotal = (state: IRootState) => state.cartReducer.total
export const selectUserData = (state: IRootState) => state.cartReducer.user