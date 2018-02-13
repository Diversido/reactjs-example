import { cloneDeep, extend } from "lodash";
import * as types from "../actionTypes";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.FETCH_ORDER_FULFILLED: {
      return extend(cloneDeep(state), {
        currentOrder: action.payload.order
      });
    }
    case types.FETCH_ORDER_REJECTED: {
      return extend(cloneDeep(state), {
        errors: action.payload.errors
      });
    }
    case types.FETCH_ORDERS_LIST_FULFILLED: {
      return extend(cloneDeep(state), {
        ordersList: action.payload.ordersList,
        pagination: action.payload.pagination
      });
    }
    case types.FETCH_ORDERS_LIST_REJECTED: {
      return extend(cloneDeep(state), {
        errors: action.payload.errors
      });
    }
    case types.CLEAR_ORDER: {
      return extend(cloneDeep(state), {
        currentOrder: undefined
      });
    }
    case types.CLEAR_ORDERS_LIST: {
      return extend(cloneDeep(state), {
        ordersList: undefined
      });
    }
    default:
      break;
  }
  return state;
}
