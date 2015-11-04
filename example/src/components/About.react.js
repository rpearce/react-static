import React, { Component } from 'react';
import { Link } from 'react-router';

export default class About extends Component {
  static meta = {
    title: 'About',
    description: 'This is about me'
  }

  render() {
    return (
      <main role="main">
        <header>
          <h1>About</h1>
        </header>
      </main>
    );
  }
}
