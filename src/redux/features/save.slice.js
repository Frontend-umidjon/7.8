import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: JSON.parse(localStorage.getItem("saved")) || [],
}

export const SaveSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    toggleSave: (state, action)=>{
      let index = state.value.findIndex(item => item.id === action.payload.id)
      if(index < 0){
        state.value.push(action.payload)
      }else{
        state.value = state.value.filter(item => item.id !== action.payload.id)
      }
      localStorage.setItem("saved", JSON.stringify(state.value))
    }
  },
})

export const { toggleSave } = SaveSlice.actions

export default SaveSlice.reducer