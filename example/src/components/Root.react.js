import React, { Component } from 'react';
import Nav from './Nav.react';

export default class Root extends Component {
  render() {
    const { title, description } = this.props.children.type.meta;
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
          { this.props.children }
        </body>
      </html>
    );
  }
}
