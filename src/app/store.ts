import { configureStore, ActionCreatorsMapObject } from "@reduxjs/toolkit";
import { useMemo } from "react";
import counterReducer from "../features/counter/counterSlice";
import { coinsReducer } from "../features/main/tableData/table/Table.slice";
import { globalReducer } from "../features/main/tableData/table/Table.slice";
import { useAppDispatch } from "./hooks";
import { BoundActions } from "./store.types";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    coinsReducer,
    globalReducer,
  },
});

export const useBoundActions = <Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  // @ts-ignore
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
