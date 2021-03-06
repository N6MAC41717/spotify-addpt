import React, { useContext, useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import LibraryContext from '../../context/library/libraryContext';
import useAPIRequest from '../../utils/useAPIRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const { clearCurrent } = useContext(LibraryContext);

  const [isShowing, setIsShowing] = useState(false);

  const loc = useLocation();

  const setConfig = useAPIRequest()[1];

  return (
    <Fragment>
      <div className='navbar-toggle' onClick={() => setIsShowing(!isShowing)}>
        {isShowing ? 'X' : <FontAwesomeIcon icon='bars' />}
      </div>
      <div className={`navbar ${isShowing ? ' navbar-showing' : ''}`}>
        <ul>
          <li>
            <Link
              to='/'
              className='nav-link'
              onClick={() => {
                window.scrollTo(0, 0);
                isShowing && setIsShowing(false);
                loc.pathname === '/' && clearCurrent();
              }}
            >
              <FontAwesomeIcon icon='home' size='lg' />
            </Link>
          </li>
          <li>
            <Link
              to='/settings'
              className='nav-link'
              onClick={() => isShowing && setIsShowing(false)}
            >
              <FontAwesomeIcon icon='cog' size='lg' />
            </Link>
          </li>
          <li className={loc.pathname === '/settings' ? 'disabled' : ''}>
            <div
              onClick={() => {
                isShowing && setIsShowing(false);
                loc.pathname !== '/settings' &&
                  setConfig({
                    url: '/api/sync',
                    method: 'post'
                  });
              }}
            >
              <FontAwesomeIcon icon='sync-alt' size='lg' />
            </div>
          </li>
          <li>
            <div onClick={logout}>
              <FontAwesomeIcon icon='door-open' size='lg' />
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Navbar;
