import React from 'react';

export default class Link extends React.Component {
  render() {
    return (
      <a href={this.props.href}>{this.props.content}</a>
    );
  }
}
