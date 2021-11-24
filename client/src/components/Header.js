// A function that displays signin/signout on the home page.

import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ context }) => {
  const authUser = context.authenticatedUser;
  return (
    <header>
      <div className='wrap header--flex'>
        <h1 className='header--logo'>
          <Link to='/'>Courses</Link>
        </h1>
        <nav>
          <ul className='header--signedout'>
            {authUser ? (
              <React.Fragment>
                <li>
                  Welcome {authUser.firstName} {authUser.lastName}
                </li>
                <li>
                  <Link to='/signout'>Sign Out</Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  <Link to='/signup'>Sign Up</Link>
                </li>
                <li>
                  <Link to='/signin'>Sign In</Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
