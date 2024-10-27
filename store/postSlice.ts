import { PostProps } from "@/types/postType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  posts: PostProps[];
  refetch: boolean;
}

const initialState: PostState = {
  posts: [],
  refetch: false,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<PostProps>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<PostProps>) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setPosts: (state, action: PayloadAction<PostProps[]>) => {
      state.posts = action.payload; // Replace existing posts with the new array
    },
    refetchPost: (state, action: PayloadAction<boolean>) => {
      state.refetch = action.payload;
    },
  },
});

export const { addPost, updatePost, deletePost, setPosts, refetchPost } =
  postSlice.actions;
export const postReducer = postSlice.reducer;
