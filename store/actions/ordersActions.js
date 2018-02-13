import axios from "axios";
import Notifications from "react-notification-system-redux";

import * as types from "../actionTypes";
import { changeLoading } from "./loaderActions";

export function fetchOrder(id) {
  return dispatch => {
    dispatch(changeLoading(true));
    axios
      .get(Routes.api_v1_order_path(id))
      .then(response => {
        dispatch({
          type: types.FETCH_ORDER_FULFILLED,
          payload: {
            order: response.data.order
          }
        });
      })
      .catch(errors => {
        dispatch({
          type: types.FETCH_ORDER_REJECTED,
          payload: {
            errors
          }
        });

        dispatch(
          Notifications.error({
            message: i18next.t("notifications:fetchOrderError"),
            position: "tr",
            autoDismiss: 5
          })
        );
      })
      .finally(() => {
        dispatch(changeLoading(false));
      });
  };
}

export function clearOrder() {
  return dispatch => {
    dispatch({
      type: types.CLEAR_ORDER
    });
  };
}

export function fetchOrdersList(params) {
  return dispatch => {
    dispatch(changeLoading(true));
    axios
      .get(Routes.api_v1_orders_path(params))
      .then(response => {
        dispatch({
          type: types.FETCH_ORDERS_LIST_FULFILLED,
          payload: {
            ordersList: response.data.ordersList,
            pagination: response.data.pagination
          }
        });
      })
      .catch(errors => {
        dispatch({
          type: types.FETCH_ORDERS_LIST_REJECTED,
          payload: {
            errors
          }
        });
        dispatch(
          Notifications.error({
            message: i18next.t("notifications:fetchOrdersListError"),
            position: "tr",
            autoDismiss: 5
          })
        );
      })
      .finally(() => {
        dispatch(changeLoading(false));
      });
  };
}

export function clearOrdersList() {
  return dispatch => {
    dispatch({
      type: types.CLEAR_ORDERS_LIST
    });
  };
}
