import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TCoin, TFetchCoinsRequest } from "../TableData.types";
import { coinsApi } from "../../../../api/coinsApi/coins.api";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../../../utils";

export interface ICategoriesState {
  coins: TCoin[];
  message: any;
  status: "idle" | "loading" | "failed";
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}

export const initialState: ICategoriesState = {
  coins: [],
  message: "",
  status: "idle",
  meta: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  },
};

const coinsSlice = createSlice({
  name: "coinsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchCoins.pending, (state) => {
      state.meta.fetching = true;
    });
    builder.addCase(fetchCoins.fulfilled, (state, { payload }) => {
      state.coins = payload;
      state.meta.fetching = false;
    });
    builder.addCase(fetchCoins.rejected, (state, { payload }) => {
      state.meta.fetching = false;
    });

    // MATCHER
    builder.addMatcher(isPendingAction, (state) => {
      state.status = "loading";
      state.message = "";
    });
    builder.addMatcher(isFulfilledAction, (state) => {
      state.status = "idle";
    });
    builder.addMatcher(isRejectedAction, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    });
  },
});

export const fetchCoins = createAsyncThunk(
  "moviesReducer/fetchMovies",
  async (attributes: TFetchCoinsRequest, { rejectWithValue }) => {
    try {
      const { data } = await coinsApi.getCoins(attributes);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const { actions: coinsActions, reducer: coinsReducer } = coinsSlice;
