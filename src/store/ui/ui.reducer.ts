import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "../index";

interface IUiReducer {
    step: number;
    max: number;
    stepsLabels: ["Artest", "Albums", "Tracks", "Checkout"];
}

const initialState = {
    step: 1,
    max: 4,
    stepsLabels: ["Artest", "Albums", "Tracks", "Checkout"]
} as IUiReducer

const uiSlice = createSlice({
    initialState,
    name: "ui",
    reducers: {
        nextStep: (state) => {
            state.step++
        },
        prevStep: (state) => {
            state.step--
        },
        goToStep: (state, action) => {
            state.step = action.payload;
        }
    }

})


export const { nextStep, prevStep, goToStep } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;

export const selectCurrentStep = (state: IRootState) => state.uiReducer.step
export const selectStepsLabels = (state: IRootState) => state.uiReducer.stepsLabels
export const selectCurrentTitle = (state: IRootState) => {
    const currentStep = selectCurrentStep(state)
    return state.uiReducer.stepsLabels[currentStep - 1]
}