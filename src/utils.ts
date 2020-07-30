import { range } from "lodash";
import { Coordinates, VisitedCell, TableCell, Cell } from "./types";

export const generateGrid = <T extends { x: number; y: number }>(
  numberOfRows: number,
  numberOfColumns: number,
  value: T
): T[][] => {
  return range(numberOfRows).map((x) =>
    range(numberOfColumns).map((y) => ({ ...value, x, y }))
  );
};

export const coordinatesToCheck: Coordinates[] = [
  { y: 0, x: -1 },
  { y: 1, x: -1 },
  { y: 1, x: 0 },
  { y: 1, x: 1 },
  { y: 0, x: 1 },
  { y: -1, x: 1 },
  { y: -1, x: 0 },
  { y: -1, x: -1 },
];

export const getDistance = (
  a: Coordinates | VisitedCell,
  b: Coordinates | VisitedCell
) => {
  const colOffset = Math.abs(a.y - b.y);
  const rowOffset = Math.abs(a.x - b.x);
  const numberOfStraightSegments = Math.abs(colOffset - rowOffset);
  const numberOfDiagonalSegments =
    Math.max(colOffset, rowOffset) - numberOfStraightSegments;

  return numberOfStraightSegments * 10 + numberOfDiagonalSegments * 14;
};

export const defaultWidth: number = 32;
export const defaultHeight: number = 32;

const E: TableCell = { status: "empty" };
const B: Cell = { status: "blocked" };

export const generateTable = (height = defaultHeight, width = defaultWidth) => {
  const grid: TableCell[][] = [...Array(height)].map(() =>
    [...Array(width)].map(() => E)
  );

  const obstacles = [...Array(Math.round(width / 4))];

  obstacles.forEach((element) =>
    grid.map((elements) => {
      const randomIndex = Math.floor(
        Math.random() * Math.floor(elements.length)
      );

      return elements.splice(randomIndex, 1, B);
    })
  );

  return grid;
};
