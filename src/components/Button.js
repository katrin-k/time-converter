import React, { Component } from 'react';
import './Button.css'

export default class Button extends Component {

  render() {
    const { type, value } = this.props
    if (type === 'submit') {
      return <button type={type} onClick={this.props.onSubmit} className="button button-submit">{value}</button>
    } else if (type === 'reset') {
      return <button type={type} className="button button-reset">{value}</button>
    }
  }
}