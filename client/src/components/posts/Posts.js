import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { getPosts } from '../../actions/post';
import { PostForm } from './PostForm';
import { PostItem } from './PostItem';
import {Loading} from'../Loading';

export const Posts = () => {
    const posts = useSelector((state)=> state.postReducer.posts);
    const authenticated = useSelector((state)=> state.authReducer.authenticated);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const get = async() => {
        await dispatch(getPosts());
        setIsLoading(false);
        }
        get(); 
    },[]);
    
    if (isLoading) {
        return (
            <Loading/>
        );
    }
    return (
        <div className='posts'>
            {authenticated && <PostForm/>}
            {posts !== null && posts.length > 0 ? (
            <Fragment>        
            {posts.map((post) => (  
                <PostItem key={post._id} post={post}/>
            ))} 
            </Fragment>   
            ) : (
            <div>No results found</div>
            )}
        </div>
    )  
}