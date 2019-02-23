import { GET_ERRORS, REGISTER, SET_CURRENT_USER } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../components/layouts/helpers/setAuthToken";

export const register = (newUser, history) => dispatch => {
  axios
    .post("/users/register", newUser)
    .then(res =>
      dispatch({
        type: REGISTER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const login = userData => dispatch => {
  axios
    .post("/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
