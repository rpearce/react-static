import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Nav extends Component {
  render() {
    return (
      <nav role="navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about.html">About</Link></li>
          <li><Link to="/blog.html">Blog</Link></li>
        </ul>
      </nav>
    );
  }
}

