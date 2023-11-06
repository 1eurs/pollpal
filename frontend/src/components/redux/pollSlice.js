import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://127.0.0.1:8000";
const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const performApiRequest = async (url, method, data) => {
  try {
    const response = await axios.request({
      url: `${API}/${url}`,
      method,
      data,
      ...axiosConfig,
    });

    if (response.status === 200) return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createPollWithDates = createAsyncThunk(
  "polls/create",
  async (pollData) =>
    performApiRequest(
      "api/polls/create_poll_with_dates_times/",
      "post",
      pollData
    )
);

export const createPollWithChoices = createAsyncThunk(
  "polls/createWithChoices",
  async (pollData) =>
    performApiRequest("api/polls/create_with_choices/", "post", pollData)
);

export const fetchPolls = createAsyncThunk("polls/fetch", async () =>
  performApiRequest("api/polls", "get")
);

export const fetchChoices = createAsyncThunk("choices/fetch", async () =>
  performApiRequest("api/choices", "get")
);

export const voteInPoll = createAsyncThunk("polls/vote", async (voteData) =>
  performApiRequest("api/votes/", "post", voteData)
);

export const fetchVotes = createAsyncThunk("votes/fetch", async () =>
  performApiRequest("api/votes", "get")
);

export const fetchDates = createAsyncThunk("dates/fetch", async () =>
  performApiRequest("api/dates", "get")
);

export const voteInDatesPoll = createAsyncThunk(
  "polls/datesvote",
  async (voteData) => performApiRequest("api/datevotes/", "post", voteData)
);

export const fetchDateVotes = createAsyncThunk("datevotes/fetch", async () =>
  performApiRequest("api/datevotes", "get")
);

export const fetchComments = createAsyncThunk("comments/fetch", async () =>
  performApiRequest("api/comments/top-level", "get")
);

export const fetchReplies = createAsyncThunk("reply/fetch", async () =>
  performApiRequest(`api/replies`, "get")
);

export const createComments = createAsyncThunk(
  "comments/createComments",
  async (commentData) => performApiRequest("api/comments/", "post", commentData)
);

const pollSlice = createSlice({
  name: "polls",
  initialState: {
    error: null,
    polls: [],
    votes: [],
    choices: [],
    dates: [],
    dateVotes: [],
    comments: [],
    pollID: "",
    replies: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.polls = action.payload;
        state.error = null;
      })
      .addCase(fetchChoices.fulfilled, (state, action) => {
        state.choices = action.payload;
        state.error = null;
      })
      .addCase(fetchVotes.fulfilled, (state, action) => {
        state.votes = action.payload;
        state.error = null;
      })
      .addCase(fetchDates.fulfilled, (state, action) => {
        state.dates = action.payload;
        state.error = null;
      })
      .addCase(fetchDateVotes.fulfilled, (state, action) => {
        state.dateVotes = action.payload;
        state.error = null;
      })
      .addCase(fetchReplies.fulfilled, (state, action) => {
        state.replies = action.payload;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.error = null;
      });
  },
});

export default pollSlice.reducer;
