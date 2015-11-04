import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Blog extends Component {
  static meta = {
    title: 'Blog',
    description: 'This is the blog'
  }

  render() {
    return (
      <main role="main">
        <header>
          <h1>Blog</h1>
        </header>
      </main>
    );
  }
}
