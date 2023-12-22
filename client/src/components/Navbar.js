import React, { Fragment, useState, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const [search, setSearch] = useState('');
  const navRef = useRef();
  const navigate = useNavigate();
  const authenticated = useSelector((store) => store.authReducer.authenticated);
  const [showLink, setShowLink] = useState(false);
  const [showSearch, setshowSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim().length !== 0 ) {
      navigate(`/search?q=${search}`);
    }
  };
  return (
    <Fragment>
    <nav>
      <div className='logo'>BLOG</div>
      <button className='searchbtn' onClick={()=> {setshowSearch(!showSearch); setShowLink(false)}}>{showSearch ? <FontAwesomeIcon icon={faTimes} color="#333333"/> : <FontAwesomeIcon icon={faSearch} color="#333333"/>}</button>
        <form className={showSearch ? "open": ""} onSubmit={(e)=> handleSearch(e)}>
          <input type='text' placeholder='Search' value={search} onChange={(e)=> {setSearch(e.target.value)}}/>
          <button type='submit'><FontAwesomeIcon icon={faSearch} color="#333333"/></button>
        </form>
        <button className='togglebtn' onClick={()=> {setShowLink(!showLink); setshowSearch(false)}}>
        {showLink ? <FontAwesomeIcon icon={faTimes} color="#333333"/> : <FontAwesomeIcon icon={faBars} color="#333333"/>}
        </button>
        <ul className={showLink ? "open": ""}>
        {!authenticated && 
        <>
          <li>
            <NavLink className='navLink' to='/login'>Login</NavLink>
          </li>
          <li>
            <NavLink className='navLink' to='/register'>Register</NavLink>
          </li> 
        </>}
          <li>
            <NavLink className='navLink' to='/posts'>Posts</NavLink>
          </li>
        </ul>
    </nav>
    </Fragment>
  )
}