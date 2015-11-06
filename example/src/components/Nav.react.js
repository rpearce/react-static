import React from 'react';
import { Link } from 'react-router';

const Nav = () =>
  <nav role="navigation">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about.html">About</Link></li>
      <li><Link to="/blog.html">Blog</Link></li>
    </ul>
  </nav>

export default Nav;
