import { createStore, Store } from "redux";
import reducer from "./reducer";
import { MainState, Action } from "./types";

const store = createStore(reducer);

export default function configureStore(): Store<MainState, Action<any>> {
  return store;
}
