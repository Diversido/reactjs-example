import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as notifications } from "react-notification-system-redux";

import loader from "./loaderReducer";
import orders from "./ordersReducer";

export default combineReducers({
  notifications,
  router: routerReducer,
  loader,
  orders
});
