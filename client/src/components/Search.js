import React, { useState, Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchPosts } from '../actions/post';
import { useSelector, useDispatch } from 'react-redux';
import PostItem from './posts/PostItem';
import { Loading } from'./Loading';

export const Search = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const searchResults = useSelector((state)=> state.postReducer.searchResults);
    const query = new URLSearchParams(location.search);
    const [isLoading, setLoading] = useState(true);
    const key = query.get('q');
    
    useEffect(() => {
        const get = async () => {
           await dispatch(searchPosts(key));
           setLoading(false);  
          }
          get();
    },[key]);

    if (isLoading) {
        return (
            <Loading/>
        );
    };
     
    if (key==='' || key===null) {
        return (
            <div>PAGE DOES NOT EXIST</div>
        )
    };

    return (
        <div className='posts'>
            {searchResults !== null && searchResults.length > 0 ? (
            <Fragment>        
            {searchResults.map((post) => (  
                <PostItem key={post._id} post={post}/>
            ))} 
            </Fragment>   
            ) : (
            <div>No results found</div>
            )}
        </div>
    )  
}