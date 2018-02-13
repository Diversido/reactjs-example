import { cloneDeep, extend } from "lodash";
import * as types from "../actionTypes";

const defaultState = {
  isLoading: false
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case types.CHANGE_LOADING: {
      return extend(cloneDeep(state), {
        isLoading: action.payload.isLoading
      });
    }
  }
  return state;
}
