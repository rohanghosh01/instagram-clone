import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { postReducer } from "@/store/postSlice";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { userReducer } from "./userSlice";
import { storyReducer } from "./storySlice";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const postPersistConfig = {
  key: "posts",
  storage: storage,
  whitelist: ["posts"],
};

const persistedReducer = persistReducer(postPersistConfig, postReducer);

const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer,
  story: storyReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
