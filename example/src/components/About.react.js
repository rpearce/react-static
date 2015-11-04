import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav.react';

export default class About extends Component {
  static meta = {
    title: 'About',
    description: 'This is about me'
  }

  render() {
    return (
      <div>
        <header role="header">
          <Nav />
        </header>
        <main role="main">
          <header>
            <h1>About</h1>
          </header>
        </main>
      </div>
    );
  }
}
