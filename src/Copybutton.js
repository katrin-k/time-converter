import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard'

export default class Copybutton extends Component {
  state = {copied: false};

  render() {
    return (<div>
    <CopyToClipboard text={this.props.copytext} onCopy={this.onClick}>
      <button>Copy date</button>
    </CopyToClipboard>
    {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
    </div>)
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