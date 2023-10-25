import React from 'react';
import Headermain from './Headermain';

const Layout = ({ children }) => (
  <div>
    <Headermain />
    {children}
  </div>
);

export default Layout;