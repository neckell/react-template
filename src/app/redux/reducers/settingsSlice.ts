/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SettingsState {
  theme: string
}

const initialState: SettingsState = {
  theme: (localStorage.getItem("theme") as string) || "light",
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
      localStorage.setItem("theme", action.payload)
    },
  },
})

export const { setTheme } = settingsSlice.actions

export default settingsSlice.reducer
