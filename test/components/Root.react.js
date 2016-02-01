import React, { Component } from 'react';
import { Link } from 'react-router';
import { path } from './routes';

const Root = ({ children }) => {
  const { title, description } = children.type.meta;
  return (
    <html lang="en">
      <head>
        <title>{ title }</title>
        <meta property="description" content={ description } />
      </head>
      <body>
        <header role="header">
          <nav role="navigation">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to={ path('ExampleRoute') }>Example</Link></li>
              <li><Link to={ path('NestedExampleRoute') }>Nested Example</Link></li>
            </ul>
          </nav>
        </header>
        { children }
      </body>
    </html>
  );
};

export default Root;
