import React, { Fragment, memo, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { deletePost } from '../../actions/post';
import avatar from'./default-avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const PostItem = ({ post }) => {
    const user = useSelector((state)=> state.authReducer.user);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    console.log("render");
    /*<div className='postUser'>
    <img src={post.user.image}  height="40" width="auto"  />*/
    const onDelete = (id) => {
        dispatch(deletePost(id));
    }
    return( 
        <div className='postItem'>
            <div className='postUser'>
            <img src={avatar}  height="40" width="auto"  />
            <div><b>{post.user.name}</b></div>
            {post.user?._id === user?._id && 
            <button style={{marginLeft: 'auto'}}onClick={(e)=> onDelete(post._id)}><FontAwesomeIcon icon={faTrash}/></button>}
            </div>
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
            <img src={post.image} width="200" height="auto" className='postImg' />
            </Fragment>
        </div>
    )
}
export default memo(PostItem);