import { LOGIN, LOGOUT, REGISTER, USER_LOADED, AUTH_ERROR} from './types';
import axios from '../axios';
import setAuthToken from '../setAuthToken';

export const login = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/login`, data);
    console.log(res.data);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      dispatch({
        type: LOGIN,
        payload: res.data,
      });
    }
  } catch (err) {
      console.log(err);
      if (err.response.status == 400){
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data.msg
        })
      }
      else {
        dispatch({
          type: AUTH_ERROR,
          payload: "An error occured"
        })
      }
    }
};

export const registerUser = (data) => async(dispatch) => {
  try {
    const res = await axios.post(`/auth/register`, data);
    console.log(res.data);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      dispatch({
        type: REGISTER,
        payload: res.data,
      });
    }
  } catch (err) {
      console.log(err.message);
      if (err.status == 400){
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data.msg
        })
      }
      else {
        dispatch({
          type: AUTH_ERROR,
          payload: "An error occured"
        })
      }
    }
};

export const loadUser = () => async (dispatch)=> {
  try {
    const res = await axios.get('/auth');
    console.log(res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
      console.log(err.message);
      if (err.status == 400){
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data.msg
        })
      }
      else {
        dispatch({
          type: AUTH_ERROR,
          payload: "An error occured"
        })
      }
    }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  setAuthToken();
  dispatch({ type: LOGOUT });
};
