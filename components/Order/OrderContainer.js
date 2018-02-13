import { connect } from "react-redux";

import Order from "./Order";
import { fetchOrder, clearOrder } from "../../store/actions/ordersActions";

const mapStateToProps = state => {
  return {
    user: state.user,
    order: state.orders.currentOrder,
    isLoading: state.loader.isLoading
  };
};

export default connect(mapStateToProps, {
  fetchOrder,
  clearOrder
})(Order);
