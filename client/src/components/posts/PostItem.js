import React, { Fragment, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';

export const PostItem = ({ post }) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    /*<div className='postUser'>
    <img src={post.user.image}  height="40" width="auto"  />*/
    return( 
        <div className='postItem'>
            <div className='postUser'>
            <div>{post.user.name}</div>
            </div>
            <div className='postTitle'>{post.title}</div>
            <Fragment>
            {post.text.length > 500 ?(
                <Fragment>
                {show ? 
                <div>{post.text} </div>
                : 
                <div>{post.text.substring(0,497)+'...'} </div>}     
                <button onClick={()=> setShow(!show)}>{show ? "Show Less" : "Show More"}</button>
                </Fragment>
                ) :
                (
                <div>{post.text}</div>)
                
            }
            <img src={post.image} width="300" height="auto" className='postImg' />
            </Fragment>
        </div>
)
}
