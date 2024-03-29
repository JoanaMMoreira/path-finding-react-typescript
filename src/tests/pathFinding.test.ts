import findPath from "../pathFinding";
import { generateTable } from "../utils";
import { Cell } from "../types";

const O: Cell = { status: "empty" };
const X: Cell = { status: "blocked" };

const Y = true;
const N = false;

test("when no path was found, should check all available cells", () => {
  const grid = [
    [O, O, X, O, O],
    [O, O, X, O, O],
    [O, O, X, O, O],
    [O, O, X, O, O],
    [O, O, X, O, O],
  ];
  const result = findPath(grid, { x: 0, y: 0 }, { x: 4, y: 4 });

  expect(result).toMatchClosedCells([
    [Y, Y, N, N, N],
    [Y, Y, N, N, N],
    [Y, Y, N, N, N],
    [Y, Y, N, N, N],
    [Y, Y, N, N, N],
  ]);

  expect(result).toMatchPath([
    [N, N, N, N, N],
    [N, N, N, N, N],
    [N, N, N, N, N],
    [N, N, N, N, N],
    [N, N, N, N, N],
  ]);
});

test("should find path in a grid with obstacles", () => {
  const grid = [
    [O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O],
    [O, X, O, O, O, O, O, O],
    [O, X, X, X, X, X, O, O],
    [O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O],
  ];

  const result = findPath(grid, { x: 5, y: 5 }, { x: 2, y: 2 });

  expect(result).toMatchPath([
    [N, N, N, N, N, N, N, N],
    [N, N, N, N, N, N, N, N],
    [N, N, Y, Y, Y, Y, N, N],
    [N, N, N, N, N, N, Y, N],
    [N, N, N, N, N, Y, N, N],
    [N, N, N, N, N, N, N, N],
    [N, N, N, N, N, N, N, N],
    [N, N, N, N, N, N, N, N],
  ]);

  expect(result).toMatchClosedCells([
    [N, N, N, N, N, N, N, N],
    [N, N, N, N, N, N, N, N],
    [N, N, N, Y, Y, Y, N, N],
    [N, N, N, N, N, N, Y, N],
    [N, Y, Y, Y, Y, Y, Y, N],
    [N, N, Y, Y, Y, Y, Y, N],
    [N, N, N, Y, Y, Y, N, N],
    [N, N, N, N, N, N, N, N],
  ]);

  expect(result).toMatchFCost([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 82, 76, 76, 82, 96, 0],
    [0, 0, 68, 68, 68, 68, 74, 88],
    [82, 0, 0, 0, 0, 0, 68, 82],
    [82, 68, 54, 48, 42, 48, 62, 82],
    [96, 74, 60, 54, 48, 0, 62, 82],
    [0, 88, 74, 68, 62, 62, 70, 90],
    [0, 0, 88, 82, 82, 82, 90, 0],
  ]);

  expect(result).toMatchGCost([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 72, 62, 52, 48, 52, 0],
    [0, 0, 68, 58, 48, 38, 34, 38],
    [58, 0, 0, 0, 0, 0, 24, 28],
    [54, 44, 34, 24, 14, 10, 14, 24],
    [58, 40, 30, 20, 10, 0, 10, 20],
    [0, 44, 34, 24, 14, 10, 14, 24],
    [0, 0, 38, 28, 24, 20, 24, 0],
  ]);

  expect(result).toMatchHCost([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 10, 14, 24, 34, 44, 0],
    [0, 0, 0, 10, 20, 30, 40, 50],
    [24, 0, 0, 0, 0, 0, 44, 54],
    [28, 24, 20, 24, 28, 38, 48, 58],
    [38, 34, 30, 34, 38, 0, 52, 62],
    [0, 44, 40, 44, 48, 52, 56, 66],
    [0, 0, 50, 54, 58, 62, 66, 0],
  ]);
});

test("should find path in a grid with no obstacles", () => {
  const grid = [
    [O, O, O, O, O],
    [O, O, O, O, O],
    [O, O, O, O, O],
    [O, O, O, O, O],
    [O, O, O, O, O],
  ];
  const result = findPath(grid, { x: 0, y: 0 }, { x: 4, y: 4 });

  expect(result).toMatchPath([
    [N, N, N, N, N],
    [N, Y, N, N, N],
    [N, N, Y, N, N],
    [N, N, N, Y, N],
    [N, N, N, N, Y],
  ]);

  expect(result).toMatchClosedCells([
    [Y, N, N, N, N],
    [N, Y, N, N, N],
    [N, N, Y, N, N],
    [N, N, N, Y, N],
    [N, N, N, N, N],
  ]);
});

test("should be able to render a large grid", () => {
  const grid = generateTable(1000, 1000);
  const result = findPath(grid, { x: 0, y: 0 }, { x: 999, y: 999 });

  expect(result).toHaveLength(1000);
});
