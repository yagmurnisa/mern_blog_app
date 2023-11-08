import {
    GET_POSTS,
    ADD_POST,
    GET_POST,
    SEARCH_POSTS,
  } from '../actions/types';
  
  const initialState = {
    posts: [],
    searchResults: [],
    post: null,
    error: {},
  };
  
  function postReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case SEARCH_POSTS:
        return {
          ...state,
          searchResults: payload,
        };
      case GET_POSTS:
        return {
          ...state,
          posts: payload,
        };
      case GET_POST:
        return {
          ...state,
          post: payload,
        };
      case ADD_POST:
        return {
          ...state,
          posts: [payload, ...state.posts],
        };
      default:
        return state;
    }
  }
  
  export default postReducer;