import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import CopyIcon from './Copyicon'
import './Copybutton.css'

export default class Copybutton extends Component {
  state = {copied: false};

  render() {
    const buttonStyle = "button-copy"
    const buttonClicked = buttonStyle.concat(" button-clicked")

    return (
    <CopyToClipboard text={this.props.copytext} onCopy={this.onClick}>
      <button className={this.state.copied ? buttonClicked : buttonStyle}><CopyIcon /> Copy date</button>
    </CopyToClipboard>)
  }

  onClick = () => {
    this.setState({copied:true});
    setTimeout(() => {
        this.setState({
        copied: false
      })
    }, 2000);
  }
}