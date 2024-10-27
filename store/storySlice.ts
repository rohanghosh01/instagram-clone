import { StoryProps } from "@/types/storyType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoryState {
  stories: StoryProps[];
  storyFiles: File | null;
}

const initialState: StoryState = {
  stories: [],
  storyFiles: null,
};

const storySlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    addStory: (state, action: PayloadAction<StoryProps>) => {
      state.stories.unshift(action.payload);
    },
    updateStory: (state, action: PayloadAction<StoryProps>) => {
      const index = state.stories.findIndex(
        (story) => story.id === action.payload.id
      );
      if (index !== -1) {
        state.stories[index] = action.payload;
      }
    },
    deleteStory: (state, action: PayloadAction<string>) => {
      state.stories = state.stories.filter(
        (story) => story.id !== action.payload
      );
    },
    setStories: (state, action: PayloadAction<StoryProps[]>) => {
      state.stories = action.payload; // Replace existing posts with the new array
    },

    AddStoryFile: (state, action: PayloadAction<File>) => {
      state.storyFiles = action.payload;
    },
  },
});

export const { addStory, updateStory, deleteStory, setStories, AddStoryFile } =
  storySlice.actions;
export const storyReducer = storySlice.reducer;
