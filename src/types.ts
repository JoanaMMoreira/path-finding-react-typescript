export interface TableProps {
  table: TableCell[][];
  start: Coordinates;
  end: Coordinates;
  path?: Path;
}

export type Path = Array<Array<VisitedCell | undefined>>;

export type Status = "empty" | "blocked";

export interface TableCell {
  status: Status;
}

export interface MainState {
  table: TableCell[][];
  start: Coordinates;
  end: Coordinates;
  path?: VisitedCell[][];
}

export interface Action<T = undefined> {
  type: string;
  payload?: T;
}

export interface Cell {
  status: Status;
}

export interface VisitedCell {
  gCost: number;
  hCost: number;
  fCost: number;
  isClosed: boolean;
  isPath: boolean;
  parent?: VisitedCell;
  counter: number;
  x: number;
  y: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface UserInputProps {
  calculatePath: () => void;
  setDimensions: (dimensions: Dimensions) => void;
  clearGrid: () => void;
}

export interface TableCellProps {
  cell: Cell;
  rowIndex: number;
  colIndex: number;
  start: Coordinates;
  end: Coordinates;
  path?: Path;
}

export interface Dimensions {
  width: number;
  height: number;
}
