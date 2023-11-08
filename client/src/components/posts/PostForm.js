import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../actions/post';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileBase64 from 'react-file-base64';
export const PostForm = () => {
  const [data, setData] = useState({ title: '', text: ''});
  const schema = yup.object().shape({
    title: yup.string().required('This field is required'),
    text: yup.string().required('This field is required'),
  });
  const [file, setFile] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(schema)});
  const dispatch = useDispatch();
  const change = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
  }
  const sendPost = ()=> {
    dispatch(addPost({...data, file}));
    reset();
  }
  return (
    <Fragment>
        <div >
        <form onSubmit={ handleSubmit(sendPost)}>
        <FileBase64 multiple={false} onDone={({base64}) => setFile(base64)}/>
        <input type='text' placeholder='Title' name='title' value={data.title} {...register("title")} onChange={(e) => change(e)}/>
        <p className='error'>{errors.title?.message}</p>
        <textarea
          name='text'
          cols='60'
          rows='5'
          placeholder='Share a post'
          value={data.text}
          {...register("text")} onChange={(e) => change(e)}/>
          <p className='error'>{errors.text?.message}</p>
        <button className='btn' type='submit'>Send</button>
      </form>
    </div>
    </Fragment>
  );
};
