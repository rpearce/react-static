import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav.react';

export default class Index extends Component {
  static meta = {
    title: 'Homepage',
    description: 'This is the homepage'
  }

  render() {
    return (
      <div>
        <header role="header">
          <Nav />
        </header>
        <main role="main">
          <header>
            <h1>Home</h1>
          </header>
        </main>
      </div>
    );
  }
}
