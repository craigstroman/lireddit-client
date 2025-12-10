import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from '../../generated/graphql';
import './NavBar.scss';

export const NavBar: React.FC = () => {
  const location = useLocation();
  const [, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout({});
    navigate('/');
  };

  if (data && data.me && data?.me.username) {
    return (
      <header>
        <div className="navigation-content">
          <div className="heading">
            <h1>
              <a href="/dashboard">LiReddit</a>
            </h1>
          </div>
          <div className="navbar-content">
            <div className="whois-online">
              <a href="/online-users">Who Is Online</a>
            </div>
            <div className="username">
              <b>Username: {data?.me?.username}</b>
            </div>
            <div className={location.pathname.indexOf('/post/') === 0 ? 'navbar-links post' : 'navbar-links'}>
              <div className="navbar-link-content">
                <div className="create-post-link">
                  <a href="/create-post">Create Post</a>
                </div>
                <button className="logout-button" type="button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header>
      <div className="header-content">
        <div className="header-content-items">
          <div className="link">
            <a href="/login">Login</a>
          </div>
          <div className="link">
            <a href="/register">Register</a>
          </div>
        </div>
      </div>
    </header>
  );
};
