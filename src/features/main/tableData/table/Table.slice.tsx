import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TCoin, TFetchCoinsRequest, TGlobal } from "../TableData.types";
import { coinsApi } from "../../../../api/coinsApi/coins.api";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../../../utils";
import { globalApi } from "../../../../api/globalApi/global.api";

export interface ICategoriesState {
  coins: TCoin[];
  global: TGlobal;
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
  global: { data: { total_market_cap: {}, total_volume: {} } },
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
    builder.addCase(fetchCoins.rejected, (state) => {
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

const globalSlice = createSlice({
  name: "globalReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchGlobal.pending, (state) => {
      state.meta.fetching = true;
    });
    builder.addCase(fetchGlobal.fulfilled, (state, { payload }) => {
      state.meta.fetching = false;
      state.global = payload;
    });
    builder.addCase(fetchGlobal.rejected, (state) => {
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
  "coinsReducer/fetchCoins",
  async (attributes: TFetchCoinsRequest, { rejectWithValue }) => {
    try {
      const { data } = await coinsApi.getCoins(attributes);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

// export const fetchGlobal = createAsyncThunk(
//   "coinsReducer/fetchGlobal",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await globalApi.getGlobal();
//       return data;
//     } catch (e: any) {
//       return rejectWithValue(e.message);
//     }
//   }
// );
// export const fetchGlobal = createAsyncThunk<
//   TCoinTest[],
//   void,
//   { rejectValue: string }
// >("coinsReducer/fetchGlobal", async (_, { rejectWithValue }) => {
//   try {
//     const { data } = await globalApi.getGlobal();
//     return data;
//   } catch (e: any) {
//     return rejectWithValue(e.message);
//   }
// });
export const fetchGlobal = createAsyncThunk<
  TGlobal,
  void,
  { rejectValue: string }
>("globalReducer/fetchFriends", async (_, { rejectWithValue }) => {
  try {
    const { data } = await globalApi.getGlobal();
    return data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});
export const { actions: coinsActions, reducer: coinsReducer } = coinsSlice;
export const { actions: globalActions, reducer: globalReducer } = globalSlice;
