import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Navbar } from './components/Navbar';
import { PageNotFound } from './components/PageNotFound';
import { Search } from './components/Search';
import { Posts } from "./components/posts/Posts";
import './App.css';
import { Provider } from 'react-redux';
import setAuthToken from "./setAuthToken";
import store from './store';
import { loadUser } from "./actions/auth";
const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }
  },[]);
  
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Navigate to="/login"/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/search' element={<Search />} />
      <Route path='/posts' element={<Posts />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}
export default App