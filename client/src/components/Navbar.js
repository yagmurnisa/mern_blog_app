import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const authenticated = useSelector((store) => store.authReducer.authenticated);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim().length !== 0 ) {
      navigate(`/search?q=${search}`);
    }
  };

  return (
    <Fragment>
    <div className='navbar'>
      <h1><Link className='navLink' style={{textDecoration: 'none'}} to='/posts'>BLOG</Link></h1>
      <div className='navInner'>
        <form onSubmit={(e)=> handleSearch(e)}>
          <input type='text' placeholder='Search' value={search} onChange={(e)=> {setSearch(e.target.value)}}/>
          <button type='submit'><FontAwesomeIcon icon={faSearch}  color="gray" /></button>
        </form>
        {!authenticated &&
        <ul>
          <li>
            <Link className='navLink' to='/login'>Login</Link>
          </li>
          <li>
            <Link className='navLink'  to='/register'>Register</Link>
          </li>
        </ul>}
        
      </div>
    </div>
    </Fragment>
  )
}