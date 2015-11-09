import React, { Component } from 'react';
import Nav from './Nav.react';

const Root = ({ children }) => {
  const { title, description } = children.type.meta;
  return (
    <html lang="en">
      <head>
        <title>{ title }</title>
        <meta property="description" content={ description } />
        <script src="app.js" async></script>
      </head>
      <body>
        <header role="header">
          <nav role="navigation">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/example.html">Example</Link></li>
            </ul>
          </nav>
        </header>
        { children }
      </body>
    </html>
  );
}

export default Root;
