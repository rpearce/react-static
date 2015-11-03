import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Item extends Component {
  render() {
    const { name, path, image, description } = this.props.item;

    return (
      <li aria-labelledby={ `workName-${name}` } aria-describedby={ `workDesc-${name}` }>
        <Link to={ path }>
          <img src={ image } alt={ name } title={ name } />
          <h3 id={ `workName-${name}` }>{ name }</h3>
          <p id={ `workDesc-${name}` }>{ description }</p>
        </Link>
      </li>
    );
  }
}
