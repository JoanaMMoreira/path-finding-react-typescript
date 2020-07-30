import { Action, Dimensions } from "./types";

export const CALCULATE_PATH = "CALCULATE_PATH";
export const CLEAR_GRID = "CLEAR_GRID";
export const SET_DIMENSIONS = "SET_DIMENSIONS";

export const calculatePath = (): Action => ({
  type: CALCULATE_PATH,
});

export const clearGrid = (): Action => ({
  type: CLEAR_GRID,
});

export const setDimensions = (payload: Dimensions): Action<Dimensions> => ({
  type: SET_DIMENSIONS,
  payload,
});
