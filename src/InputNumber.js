import React, { Component } from 'react';

export default class InputNumber extends Component {
  state = {error: false, value: ''}

  render() {
    return <span>
      <input type="number" value={this.state.value} onChange={this.handleChange} />
      {/* FF shows error msg only as a tooltip title... */}
      {this.state.error ? <p>Please enter a number</p> : null}
    </span>
  }

  handleChange = (e) => {
    console.log("submit e", e)
    this.setState({value: e.target.value})
    // !isNaN(input) ? this.props.returnData(input) : this.showError()
  }

  showError = () => {
    this.setState({error: true})
  }
}