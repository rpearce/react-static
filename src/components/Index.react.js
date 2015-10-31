import React from 'react';
import { Link } from 'react-router';
import WorkItems from './work/Items.react';

export default class Index extends React.Component {
  static meta = {
    title: 'Homepage',
    description: 'This is the homepage'
  }

  render() {
    return (
      <main role="main">
        <section aria-labelledby="about__intro">
          <h2 id="about__intro">Hello, I'm Robert.</h2>
          <p>I am a leader, problem-solver and software developer - in that order.</p>
        </section>
        <section>
          <blockquote>Robert is one of the best lorem ipsum dolor sit amet. He will solve all of your problems. - Sam August</blockquote>
        </section>
        <section aria-labelledby="about__work">
          <h2 id="about__work">Work</h2>
          <WorkItems />
        </section>
        <section aria-labelledby="about__posts">
          <h2 id="about__posts">Posts</h2>
          <ol>
            <li>How to...</li>
          </ol>
        </section>
      </main>
    );
  }
}
