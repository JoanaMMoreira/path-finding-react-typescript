import React from "react";
import { render, fireEvent } from "@testing-library/react";
import configureStore from "../store";
import { Provider } from "react-redux";
import App from "../App";

test("User input buttons should work as expected", async () => {
  const store = configureStore();

  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(store.getState().start).toEqual({ x: 0, y: 0 });

  expect(store.getState().path).toBeUndefined();

  // Find path
  const startBtn = await getByTestId("start-testid");
  await fireEvent.click(startBtn);
  expect(store.getState().path).not.toBeUndefined();

  // Reset
  const resetBtn = await getByTestId("reset-testid");
  await fireEvent.click(resetBtn);
  expect(store.getState().path).toBeUndefined();

  // Change dimensions
  expect(store.getState().table).toHaveLength(32);

  const setWidthBtn = await getByTestId("width-testid");
  await fireEvent.change(setWidthBtn, { target: { value: 7 } });

  const setHeightBtn = await getByTestId("height-testid");
  await fireEvent.change(setHeightBtn, { target: { value: 7 } });

  const setDimensionsBtn = await getByTestId("setDimensions-testid");
  await fireEvent.click(setDimensionsBtn);
  expect(store.getState().table).toHaveLength(7);
});
