import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://127.0.0.1:8000"; // Define your API base URL

export const createPollWithDates = createAsyncThunk(
  "polls/create",
  async (pollData) => {
    try {
      const response = await fetch(
        `${API}/api/polls/create_poll_with_dates_times/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pollData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create poll");
      }
    } catch (error) {
      throw new Error("Network error");
    }
  }
);

export const createPollWithChoices = createAsyncThunk(
  "polls/createWithChoices",
  async (pollData) => {
    try {
      const response = await fetch(`${API}/api/polls/create_with_choices/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pollData),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || "Failed to create poll with choices"
        );
      }
    } catch (error) {
      throw new Error("Network error");
    }
  }
);

const pollSlice = createSlice({
  name: "polls",
  initialState: {
    creatingPoll: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPollWithDates.pending, (state) => {
        state.creatingPoll = true;
        state.error = null;
      })
      .addCase(createPollWithDates.fulfilled, (state) => {
        state.creatingPoll = false;
        state.error = null;
      })
      .addCase(createPollWithDates.rejected, (state, action) => {
        state.creatingPoll = false;
        state.error = action.error.message;
      })
      .addCase(createPollWithChoices.pending, (state) => {
        state.creatingPoll = true;
        state.error = null;
      })
      .addCase(createPollWithChoices.fulfilled, (state) => {
        state.creatingPoll = false;
        state.error = null;
      })
      .addCase(createPollWithChoices.rejected, (state, action) => {
        state.creatingPoll = false;
        state.error = action.error.message;
      });
  },
});

export default pollSlice.reducer;
