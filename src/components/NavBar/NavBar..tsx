import React from 'react';
import Cookies from 'universal-cookie';
import { useLogoutMutation } from '../../generated/graphql';
import './NavBar.scss';

export const NavBar: React.FC = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const cookies = new Cookies(null, { path: '/', domain: 'localhost' });
  const uid = cookies.get('uid');

  if (uid) {
    return (
      <header>
        <div className="header-content">
          <button
            className="logout-button"
            type="button"
            onClick={() => {
              logout();
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </header>
    );
  }

  return (
    <header>
      <div className="header-content">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </header>
  );
};
