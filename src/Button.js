import React, { Component } from 'react';

export default class Button extends Component {

  render() {
    return <button type="submit" onClick={this.props.onSubmit}>{this.props.value}</button>
  }
}