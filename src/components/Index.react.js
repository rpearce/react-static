import React from 'react';
import Link from './Link.react';

export default class Index extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <title>Title</title>
          <meta property="description" content="descr" />
        </head>
        <body>
          <Link href="http://www.google.com" content="Google" />
          <main role="main">
            <section>
              <div>Hello</div>
            </section>
            <section>
              <blockquote>Hello</blockquote>
            </section>
            <section aria-labelledby="about__work">
              <h2 id="about__work">Work</h2>
              <ul>
                <li>statik-js</li>
              </ul>
            </section>
            <section aria-labelledby="about__posts">
              <h2 id="about__posts">Posts</h2>
              <ol>
                <li>How to...</li>
              </ol>
            </section>
          </main>
        </body>
      </html>
    );
  }
}
