import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from '../actions/auth';

export const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({email: '', name: '', password: '', password2: ''});
    const schema = yup.object().shape({
        email: yup.string().required('This field is required').email("Please enter a valid email"),
        name: yup.string().required('This field is required').min(5).max(15),
        password: yup.string().required('This field is required').min(8).max(24),
        password2: yup.string().required('This field is required').oneOf([yup.ref('password'), null], 'Passwords must match')
      });
    const { register, handleSubmit, formState: { errors } ,reset} = useForm({resolver: yupResolver(schema)});
    const dispatch = useDispatch();
    const authenticated = useSelector((store) => store.authReducer.authenticated);

    const registerFunc = () => {
        console.log(data.email, data.password);
        dispatch(registerUser(data));
    }
    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    if (authenticated) {
        return <Navigate to='/posts' />;
    }
    return (
        <div className='loginForm'>
            <h1>Sign Up</h1> 
            <form onSubmit={handleSubmit(registerFunc)}>
            <input type='text' placeholder='Email Address' name='email' value={data.email} {...register("email")} onChange={e => change(e)}/>
            <p className='error'>{errors.email?.message}</p>
            <input type='text' placeholder='Username (5-15 characters)' name='name' value={data.name} {...register("name", { required: true, minLength: 5, maxLength: 15 })} onChange={e => change(e)}/>
            <p className='error'>{errors.name?.message}</p>
            <input type='password' placeholder='Password (8-24 characters)' name='password' value={data.password} {...register("password", { required: true, minLength: 8, maxLength: 20 })} onChange={e => change(e)}/>
            <p className='error'>{errors.password?.message}</p>
            <input type='password' placeholder='Confirm Password' name='password2' value={data.password2} {...register("password2")} onChange={e => change(e)}/>
            <p className='error'>{errors.password2?.message}</p>
            <button className='btn' type='submit'>Sign Up</button>
            </form>
            <p>
            Already have an account? <Link to='/login'>Sign in</Link>
            </p>
        
        </div>
    )
}