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

export const fetchPolls = createAsyncThunk("polls/fetch", async () => {
  try {
    const response = await fetch(`${API}/api/polls`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch polls");
    }
  } catch (error) {
    throw new Error("Network error");
  }
});

export const fetchChoices = createAsyncThunk("choices/fetch", async () => {
  try {
    const response = await fetch(`${API}/api/choices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch choices");
    }
  } catch (error) {
    throw new Error("Network error");
  }
});

export const voteInPoll = createAsyncThunk("polls/vote", async (voteData) => {
  try {
    const response = await fetch(`${API}/api/votes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voteData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to vote in poll");
    }
  } catch (error) {
    throw new Error("Network error");
  }
});

export const fetchVotes = createAsyncThunk("votes/fetch", async () => {
  try {
    const response = await fetch(`${API}/api/votes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch choices");
    }
  } catch (error) {
    throw new Error("Network error");
  }
});
export const fetchDates = createAsyncThunk("dates/fetch", async () => {
  try {
    const response = await fetch(`${API}/api/dates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch choices");
    }
  } catch (error) {
    throw new Error("Network error");
  }
});

export const voteInDatesPoll = createAsyncThunk(
  "polls/datesvote",
  async (voteData) => {
    try {
      const response = await fetch(`${API}/api/datevotes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voteData),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to vote in poll");
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
    polls: [],
    votes: [],
    choices: [],
    dates: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPollWithDates.pending, (state) => {
        state.creatingPoll = true;
      })
      .addCase(createPollWithDates.fulfilled, (state) => {
        state.creatingPoll = false;
      })
      .addCase(createPollWithDates.rejected, (state, action) => {
        state.creatingPoll = false;
        state.error = action.error.message;
      })
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
      .addCase(voteInPoll.pending, (state) => {
        state.voting = true;
      })
      .addCase(voteInPoll.fulfilled, (state) => {
        state.voting = false;
      })
      .addCase(voteInPoll.rejected, (state, action) => {
        state.voting = false;
        state.error = action.error.message;
      })
      .addCase(voteInDatesPoll.pending, (state) => {
        state.voting = true;
      })
      .addCase(voteInDatesPoll.fulfilled, (state) => {
        state.voting = false;
      })
      .addCase(voteInDatesPoll.rejected, (state, action) => {
        state.voting = false;
        state.error = action.error.message;
      });
  },
});

export default pollSlice.reducer;
