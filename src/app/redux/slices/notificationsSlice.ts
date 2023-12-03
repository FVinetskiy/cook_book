import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type notification = {
  key?: string;
  message?: string;
  status?: string;
  autoClose?: number;
};

const initialState: any = {
  items: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<notification>) => {
      state.items.unshift(action.payload);
    },
    remove: (state, action) => {
      state.items = state.items.filter((item: any) => item.key !== action.payload);
    },
  },
});

export const notificationsSelectors = (state: RootState) => state.notificationsSlice.items;
export const { addNotification, remove } = notificationsSlice.actions;
export default notificationsSlice.reducer;
