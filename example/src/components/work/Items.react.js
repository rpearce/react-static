import React, { Component } from 'react';
import data from './data';
import Item from './Item.react';

export default class Items extends Component {
  render() {
    return (
      <ul>{ this._buildItems.call(this) }</ul>
    );
  }

  _buildItems() {
    return data.map(function(item) {
      return <Item item={ item } key={ `work-${item.name}` } />;
    });
  }
}
