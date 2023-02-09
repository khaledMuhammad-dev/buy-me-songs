import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRootState } from "..";

const postOrder = createAsyncThunk("orders/ordered", (payload: IOrder) => {
    const now = new Date()
    const id = now.getTime().toString(16);
    payload.id = id
    
    return payload
})

interface IOrders {
    orders: Array<IOrder>
}

interface IOrder {
    id?: string,
    name:string,
    email:string,
    mobile:string,
    count: number,
    total: number
}

const initialState = {
    orders: [],
} as IOrders

const ordersSlice = createSlice({
    initialState,
    name: "orders",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postOrder.fulfilled, (state, action) => {
            state.orders.push(action.payload)
        })
    }
})


export const placeOrder = postOrder
export const ordersReducer = ordersSlice.reducer;



export const selectLastOrder = (state:IRootState) => {
    const orders = state.ordersReducer.orders
    const index = orders.length - 1;

    return orders[index]
}