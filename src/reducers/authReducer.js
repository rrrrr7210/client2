import { REGISTER, SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../components/layouts/helpers/is-empty";

const initialState = {
  isAuthenticated: false,
  register: {},
  loggedUser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return {
        register: action.payload
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        loggedUser: action.payload
      };

    default:
      return state;
  }
}
