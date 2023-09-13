import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
    name: "adminUI",
    initialState: {
        BgColor: "bg-slate-200",
        textColor: "bg-black-500"
    },
    reducers: {
        changeBG(state, action) {
          state.BgColor = action.payload
        },
        changeText(state, action) {
          textColor = action.payload
        }
      }
})

export const { changeBG, changeText } = UISlice.actions
export default UISlice.reducer