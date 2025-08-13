import React from 'react';
import Cookies from 'universal-cookie';
import { useMeQuery, useLogoutMutation } from '../../generated/graphql';
import './NavBar.scss';

export const NavBar: React.FC = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const cookies = new Cookies(null, { path: '/', domain: 'localhost' });
  const [{ data }] = useMeQuery();
  const uid = cookies.get('uid');

  if (uid) {
    return (
      <header>
        <div className="header-content">
          <div className="username">{data?.me?.username}</div>
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
