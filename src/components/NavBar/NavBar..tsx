import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from '../../generated/graphql';
import './NavBar.scss';

interface IUser {
  id: number;
  username: string;
}

export const NavBar: React.FC = () => {
  const [, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetching && data) {
      if (data.me) {
        setUser({
          id: data.me.id,
          username: data.me.username,
        });
      }
    }
    setUser(null);
  }, [fetching]);

  // TODO: Continue figuring out how to rerun meQuery after a user logs out so that the data in data is updated.
  // TODO: Figure out how to reset cached query because the query is cached

  const handleLogout = () => {
    logout();
    navigate('/');
    setUser(null);
  };

  if (user?.username) {
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
