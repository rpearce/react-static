import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Index extends Component {
  static meta = {
    title: 'Homepage',
    description: 'This is the homepage'
  }

  render() {
    return (
      <main role="main">
        <header>
          <h1>Home</h1>
        </header>
      </main>
    );
  }
}
