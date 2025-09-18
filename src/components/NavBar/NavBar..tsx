import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from '../../generated/graphql';
import './NavBar.scss';

export const NavBar: React.FC = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  const navigate = useNavigate();

  const handleLogout = () => {
    // logout();
    navigate('/');
  };

  if (data && data.me && data?.me.username) {
    return (
      <header>
        <div className="header-content">
          <div className="username">{data?.me?.username}</div>
          <button className="logout-button" type="button" onClick={handleLogout}>
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
