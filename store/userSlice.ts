import { UserProps } from "@/types/postType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: UserProps | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProps>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
