import React from 'react';

export default class Root extends React.Component {
  render() {
    const { title, description } = this.props.children.type.meta;
    return (
      <html lang="en">
        <head>
          <title>{ title }</title>
          <meta property="description" content={ description } />
          <script src="app.js" async></script>
        </head>
        <body>{ this.props.children }</body>
      </html>
    );
  }
}
