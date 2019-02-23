import {
  GET_POSTS,
  MY_POSTS,
  CREATE_POST,
  DELETE_POST
} from "../actions/types";

const initialState = {
  posts: [],
  myposts: [],
  message: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };

    case MY_POSTS:
      return {
        ...state,
        myposts: action.payload
      };

    case CREATE_POST:
      return {
        ...state,
        message: action.payload.message,
        myposts: [action.payload.newpost, ...state.myposts]
      };

    case DELETE_POST:
      return {
        ...state,
        message: action.payload.message,
        myposts: state.myposts.filter(
          post => post._id !== action.payload.post._id
        )
      };

    default:
      return state;
  }
}
