import { MainState, Action } from "./types";
import findPath from "./pathFinding";
import { CALCULATE_PATH, CLEAR_GRID, SET_DIMENSIONS } from "./actions";
import { generateTable, defaultHeight, defaultWidth } from "./utils";

const initialState = (width: number, height: number): MainState => ({
  table: generateTable(width, height),
  start: { x: 0, y: 0 },
  end: { x: width - 1, y: height - 1 },
});

export default function (
  state: MainState = initialState(defaultWidth, defaultHeight),
  action: Action<any>
): MainState {
  switch (action.type) {
    case CALCULATE_PATH:
      return {
        ...state,
        path: findPath(state.table, state.start, state.end),
      };
    case SET_DIMENSIONS:
      return initialState(action.payload.height, action.payload.width);
    case CLEAR_GRID:
      return initialState(defaultWidth, defaultHeight);
    default:
      return state;
  }
}
