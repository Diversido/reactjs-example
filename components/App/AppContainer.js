import { connect } from "react-redux";
import App from "./App";

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
}

export default connect(mapStateToProps, {})(App);
