import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../actions/post';
import FileBase64 from 'react-file-base64';

export const PostForm = () => {
  const [data, setData] = useState({text: ''});
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const change = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
  }
  const sendPost = (e) => {
    e.preventDefault();
    dispatch(addPost({...data, file}));
  }
  return (
    <Fragment>
        <div >
        <form onSubmit={(e) => sendPost(e)}>
        <textarea
          name='text'
          cols='60'
          rows='5'
          placeholder='Share a post'
          value={data.text}
          onChange={(e) => change(e)}/>
          <FileBase64 multiple={false} onDone={({base64}) => setFile(base64)}/>
          <p className='error'>{error}</p>
        <button className='btn' type='submit'>Send</button>
      </form>
    </div>
    </Fragment>
  );
};
