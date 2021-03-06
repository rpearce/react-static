import React, { Component } from 'react';
import { Link } from 'react-router';
import { clientJS } from '../../config';
import { path } from './routes';

const Root = ({ children }) => {
  const { title, description } = children.type.meta;
  const script = clientJS ? <script src="/app.js" async></script> : null;
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
        { script }
      </body>
    </html>
  );
};

export default Root;
