import React from 'react';
import { NavBar } from '../NavBar/NavBar.';
import { BaseLayoutProps } from '../../shared/Interfaces';

export const Layout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <NavBar />
      {children}
    </div>
  );
};
