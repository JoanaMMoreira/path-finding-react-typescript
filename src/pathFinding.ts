import { Cell, VisitedCell, Coordinates } from "./types";
import { generateGrid, coordinatesToCheck, getDistance } from "./utils";
import { minBy, remove } from "lodash";

const findPath = (
  mainGrid: Cell[][],
  start: Coordinates,
  end: Coordinates
): VisitedCell[][] => {
  const gridLength = mainGrid.length;

  const grid = generateGrid<VisitedCell>(gridLength, gridLength, {
    fCost: 0,
    gCost: 0,
    hCost: 0,
    parent: undefined,
    isClosed: false,
    isPath: false,
    counter: 0,
    x: 0,
    y: 0,
  }); // create a GRID of cells with properties fCost, gCost, hCost, parentNode, isClosed, xCoordinate, yCoordinate

  let counter = 0;
  let openList: VisitedCell[] = []; // create an OPEN list that will hold the computed nodes

  openList.push(grid[start.x][start.y]); // insert the start node into the OPEN list

  while (openList.length > 0) {
    // while there are nodes inside OPEN

    const currentCell = minBy(openList, (c) => c.fCost); // take the node inside OPEN with the smallest fCost -> CURRENT

    if (!currentCell) {
      // if CURRENT is the END node
      return grid; // go back through the parents to compute the path and return. It's done
    }

    if (currentCell.x === end.x && currentCell.y === end.y) {
      // success! we found the end
      let current = currentCell;

      while (current.parent) {
        grid[current.x][current.y].isPath = true;
        current = current.parent;
      }

      return grid;
    }

    remove(openList, (c) => c.x === currentCell.x && c.y === currentCell.y); //remove the currentNode from the openList
    currentCell.isClosed = true; // set the GRID cell with the CURRENT coordinates to isClosed = true

    coordinatesToCheck.forEach((coordinatesToCheck) => {
      // for each NEIGHBOR of CURRENT
      const { x, y }: Coordinates = {
        x: currentCell.x + coordinatesToCheck.x,
        y: currentCell.y + coordinatesToCheck.y,
      };

      if (
        // if NEIGHBOR is blocked by an obstacle, a closed cell or out of bounds, move on to the next NEIGHBOR
        x < 0 ||
        x >= gridLength ||
        y < 0 ||
        y >= gridLength ||
        (start.x === x && start.y === y) ||
        grid[x][y].isClosed ||
        mainGrid[x][y]?.status === "blocked"
      ) {
        return;
      }

      const neighborCell = grid[x][y];

      const gCost = currentCell.gCost + getDistance(currentCell, neighborCell); // calculate the gCost for NEIGHBOR which is gCost of CURRENT + distance to NEIGHBOR
      let gCostIsBest = false;

      if (!openList.find((c) => c.x === x && c.y === y)) {
        // if NEIGHBOR is not in OPEN
        gCostIsBest = true; // add it to OPEN and set the rest of its properties (hCost, fCost and parent)
        neighborCell.hCost = getDistance(neighborCell, end);
        openList.push(neighborCell);
      } else if (gCost < neighborCell.gCost) {
        // else if NEIGHBOR is in OPEN but the new gCost is smaller than the existing node
        gCostIsBest = true;
      }

      if (gCostIsBest) {
        // update the gCost, fCost and parent of that node
        neighborCell.parent = currentCell;
        neighborCell.gCost = gCost;
        neighborCell.fCost = neighborCell.gCost + neighborCell.hCost;
        counter = counter + 1;
        neighborCell.counter = counter;
      }
    });
  }

  // return grid if no path was found
  return grid;
};

export default findPath;
