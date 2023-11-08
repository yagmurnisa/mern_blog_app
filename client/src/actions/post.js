import { GET_POST, GET_POSTS, SEARCH_POSTS, ADD_POST } from "./types";
import axios from '../axios';

export const searchPosts = (key) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/search?q=${key}`);
    console.log(res.data);
    dispatch({
      type: SEARCH_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
  }
}; 
export const addPost = (data) => async (dispatch) => {
  try {
    const res = await axios.post('/posts', data);
    console.log(res.data);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
  }
}; 
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`/posts`);
    console.log(res.data);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${id}`);
    console.log(res.data);
    dispatch({
        type: GET_POST,
        payload: res.data,
    });
  }
  catch (err) {
    console.log(err.message);
  }
};