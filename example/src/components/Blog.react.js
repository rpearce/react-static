import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav.react';

export default class Blog extends Component {
  static meta = {
    title: 'Blog',
    description: 'This is the blog',
    fileName: 'blog'
  }

  render() {
    return (
      <div>
        <header role="header">
          <Nav />
        </header>
        <main role="main">
          <header>
            <h1>Blog</h1>
          </header>
        </main>
      </div>
    );
  }
}
