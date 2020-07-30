import React from "react";
import { render } from "@testing-library/react";
import configureStore from "../store";
import { Provider } from "react-redux";
import App from "../App";
import styles from "../components/Table/TableStyles.module.css";
import { calculatePath } from "../actions";

test("Table should render as expected", async () => {
  const store = configureStore();
  const { getAllByTestId, getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const cells = await getAllByTestId(/cell-*/);

  // Renders the whole table
  expect(cells.length).toEqual(1024);

  // Renders start in green
  let { x, y } = store.getState().start;
  const start = await getByTestId(`cell-${x}-${y}`);
  expect(start).toHaveClass(styles.start);

  // Renders end in red
  ({ x, y } = store.getState().end);
  const end = await getByTestId(`cell-${x}-${y}`);
  expect(end).toHaveClass(styles.end);

  // Renders cells with the right class
  store.dispatch(calculatePath());
  expect(store.getState().path).not.toBeUndefined();
  const path = store.getState().path!;

  for (x = 0; x < 32; x = x + 1) {
    for (y = 0; y < 32; y = y + 1) {
      const cell = await getByTestId(`cell-${x}-${y}`);

      if (store.getState().table[x][y].status === "blocked") {
        expect(cell).toHaveClass(styles.blocked);
      } else {
        expect(cell).not.toHaveClass(styles.blocked);
      }

      const visitedCell = path[x][y];

      if (visitedCell.isPath) {
        expect(cell).toHaveClass(styles.path);
      }

      if (visitedCell.isClosed) {
        expect(cell).toHaveClass(styles.closed);
      }

      if (visitedCell.fCost !== 0) {
        expect(cell).toHaveClass(styles.checked);
      }
    }
  }
});
