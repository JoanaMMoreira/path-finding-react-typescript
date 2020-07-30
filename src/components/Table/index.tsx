import { connect } from "react-redux";
import { MainState } from "../../types";

import Table from "./Table";

const mapStateToProps = (state: MainState) => ({
  table: state.table,
  start: state.start,
  end: state.end,
  path: state.path,
});

export default connect(mapStateToProps)(Table);
