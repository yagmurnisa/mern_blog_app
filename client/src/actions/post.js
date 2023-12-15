import { GET_POST, GET_POSTS, SEARCH_POSTS, ADD_POST, DELETE_POST, POST_ERROR } from "./types";
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
    if (err.status == 400){
      dispatch({
        type: POST_ERROR,
        payload: err.response.data.msg
      })
    }
    else {
      dispatch({
        type: POST_ERROR,
        payload: "An error occured"
      })
    }
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
    if (err.status == 400){
      dispatch({
        type: POST_ERROR,
        payload: err.response.data.msg
      })
    }
    else {
      dispatch({
        type: POST_ERROR,
        payload: "An error occured"
      })
    }
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
    if (err.status == 400){
      dispatch({
        type: POST_ERROR,
        payload: err.response.data.msg
      })
    }
    else {
      dispatch({
        type: POST_ERROR,
        payload: "An error occured"
      })
    }
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
    if (err.status == 400){
      dispatch({
        type: POST_ERROR,
        payload: err.response.data.msg
      })
    }
    else {
      dispatch({
        type: POST_ERROR,
        payload: "An error occured"
      })
    }
  }
};

export const deletePost = (id) => async (dispatch) => {
  console.log(id);
  try {
    await axios.delete(`/posts/${id}`);
    console.log("deleted");
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  }
  catch(err) {
    if (err.status == 400){
      dispatch({
        type: POST_ERROR,
        payload: err.response.data.msg
      })
    }
    else {
      dispatch({
        type: POST_ERROR,
        payload: "An error occured"
      })
    }
  }
};