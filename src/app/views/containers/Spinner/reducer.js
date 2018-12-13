import { SpinnerActionTypes } from './types';

export const initialState = {
  isLoading: false
};

const reducer = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case SpinnerActionTypes.SPINNER_LOAD:
      return {...state, isLoading: true};
    case SpinnerActionTypes.SPINNER_HIDE:
      return {...state, isLoading: false};
    default:
      return state;
  }
};

export default reducer;
