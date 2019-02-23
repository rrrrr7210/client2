import axios from "axios";
import {
  GET_POSTS,
  MY_POSTS,
  CREATE_POST,
  GET_ERRORS,
  DELETE_POST
} from "./types";

export const getPosts = () => dispatch => {
  axios
    .get("/posts/")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

export const myPosts = id => dispatch => {
  axios.get(`/posts/myposts/${id}`).then(res =>
    dispatch({
      type: MY_POSTS,
      payload: res.data
    }).catch(err =>
      dispatch({
        type: MY_POSTS,
        payload: null
      })
    )
  );
};

export const createPost = newPost => dispatch => {
  axios
    .post("/posts/create", newPost)
    .then(res =>
      dispatch({
        type: CREATE_POST,
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

export const deletePost = id => dispatch => {
  axios
    .delete(`/posts/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
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
