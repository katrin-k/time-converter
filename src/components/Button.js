import React, { Component } from 'react';
import './Button.css'

export default class Button extends Component {

  render() {
    return <button type="submit" onClick={this.props.onSubmit} className="button" >{this.props.value}</button>
  }
}