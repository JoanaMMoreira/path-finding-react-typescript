import { connect } from "react-redux";
import { Dispatch } from "redux";
import UserInput from "./UserInput";
import { calculatePath, clearGrid, setDimensions } from "../../actions";
import { Dimensions } from "../../types";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  calculatePath: () => dispatch(calculatePath()),
  clearGrid: () => dispatch(clearGrid()),
  setDimensions: (dimensions: Dimensions) =>
    dispatch(setDimensions(dimensions)),
});

export default connect(null, mapDispatchToProps)(UserInput);
