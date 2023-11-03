import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_VOTES } from "../pages/constants";

export type IVoteState = {
  id: number;
  enabled: boolean;
  completed: boolean;
  results: boolean;
  options: {
    id: number;
    text: string;
    votes: number;
  }[];
};

export interface IVotesState {
  votes: IVoteState[];
}

const initialState: IVotesState = {
  votes: INITIAL_VOTES,
};

export const votesSlice = createSlice({
  name: "votes",
  initialState,
  reducers: {
    updateVotes: (state, { payload }) => {
      state.votes = payload;
    },
  },
});

export const { updateVotes } = votesSlice.actions;

export default votesSlice.reducer;
