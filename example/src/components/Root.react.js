import React, { Component } from 'react';
import Nav from './Nav.react';

export default function Root({ children }) {
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
          <Nav />
        </header>
        { children }
      </body>
    </html>
  );
}
