import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface modalState{
  modalOpen:string;
}

const initialState: modalState = {
  modalOpen:'modal'
}
export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {   
    ToggleModal:(state, action: PayloadAction<string>) => {state.modalOpen= action.payload}
  },
})

export const { ToggleModal} = modalSlice.actions


export default modalSlice.reducer
