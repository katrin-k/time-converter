import React, { Component } from 'react';
import moment from 'moment'
import Copybutton from './Copybutton'
import Button from './Button'

export default class UnixToHuman extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      unixDate: null
    }
  }

  render() {
    
    const {unixDate} = this.state
    const unixSeconds = unixDate ? unixDate.format() : null
    const unixMilliseconds = unixDate ? unixDate.valueOf() : null

    return <section>
      <h2>Convert to epoch/unix date</h2>
      <form onSubmit={this.convertToUnixDate} >
        <input type="date" value={this.state.inputValue} onChange={this.handleInputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
        <Button value="Convert to Unix Date" />
      </form>
      {unixDate
      ? <div>
          <p>Unix seconds: {unixSeconds}</p><Copybutton copytext={unixSeconds} />
          <p>Unix milliseconds: {unixMilliseconds}</p><Copybutton copytext={unixMilliseconds} />
        </div>
      : null}
    </section>
  }

  handleInputChange = (event) => {
    this.setState({inputValue: event.target.value});
  }


  convertToUnixDate = (e) => {
    e.preventDefault()
    const convertedDate = moment.unix(this.state.inputValue)
    this.setState({unixDate: convertedDate})
  }
}


// Fallback for when native date input is not allowed https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
// how to do that in react?