import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./data/data.reducer";
import { filterReducer } from "./filters/filter.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { ordersReducer } from "./orders/order.reducer";
import { uiReducer } from "./ui/ui.reducer";

export const store = configureStore({
    reducer: {
        filterReducer,
        cartReducer,
        dataReducer,
        ordersReducer,
        uiReducer
    }
})

export type IRootState = ReturnType<typeof store.getState>
export type IAppDispatch = typeof store.dispatch
