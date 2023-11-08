import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { login } from '../actions/auth'; 
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Login = () => {
    const [data, setData] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const authenticated = useSelector((store) => store.authReducer.authenticated);
    const schema = yup.object().shape({
        email: yup.string().required('This field is required'),
        password: yup.string().required('This field is required')
      });
    const { register, handleSubmit, formState: { errors } ,reset} = useForm({resolver: yupResolver(schema)});
    const clickSubmit = (e) => {
        dispatch(login(data));       
        
    }
    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    if (authenticated) {
        return <Navigate to='/posts' />;
       
    }
    return (
        <Fragment>
        <div className='loginForm'>      
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit(clickSubmit)}>
            <input type='text' placeholder='Email Address' name='email' {...register("email")}  value={data.email} onChange={e => change(e)}/>
            <p className='error'>{errors.email?.message}</p>
            <input type='password' placeholder='Password' name='password' {...register("password")}  value={data.password} onChange={e => change(e)}/>
            <p className='error'>{errors.password?.message}</p>
            <button className='btn' type='submit'>Login</button>
            </form>
            <p>
            Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </div>  
        </Fragment>
    )
}