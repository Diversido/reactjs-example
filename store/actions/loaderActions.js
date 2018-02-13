import * as types from "../actionTypes";

export function changeLoading(isLoading) {
  return {
    type: types.CHANGE_LOADING,
    payload: {
      isLoading
    }
  };
}
