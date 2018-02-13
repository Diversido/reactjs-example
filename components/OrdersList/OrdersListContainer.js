import { connect } from "react-redux";
import { withRouter } from "react-router";

import OrdersList from "./OrdersList";
import {
  fetchOrdersList,
  clearOrdersList
} from "../../store/actions/ordersActions";

const mapStateToProps = state => {
  return {
    user: state.user,
    orders: state.orders,
    isLoading: state.loader.isLoading
  };
};

export default withRouter(
  connect(mapStateToProps, {
    fetchOrdersList,
    clearOrdersList
  })(OrdersList)
);
