import React, { Component } from 'react';
import moment from 'moment'
import Copybutton from './Copybutton'
import Button from './Button'
import './Conversions.css'

export default class HumanToUnix extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      unixDate: null
    }
  }

  render() {
    
    const {unixDate} = this.state
    const unixSeconds = unixDate ? unixDate : null
    // const unixMilliseconds = unixDate ? moment(unixDate).valueOf() : null

    console.log("this.state.inputValue", this.state.inputValue)

    return <section>
      <h2>Convert to epoch/unix date</h2>
      <form onSubmit={this.convertToUnixDate} className="form-convert" >
        {/* <input type="datetime-local" value={this.state.inputValue} onChange={this.handleInputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" /> */}
        <input type="date" value={this.state.inputValue} onChange={this.handleInputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
        <Button value="Convert to Unix Date" />
      </form>
      {unixDate
      ? <p className="result-line" >
          <span className="result-span" >Unix seconds: {unixSeconds}</span><Copybutton copytext={unixSeconds} buttonText="time" />
          {/* <p>Unix milliseconds: {unixMilliseconds}</p><Copybutton copytext={unixMilliseconds} /> */}
        </p>
      : null}
    </section>
  }

  handleInputChange = (event) => {
    this.setState({inputValue: event.target.value});
  }


  convertToUnixDate = (e) => {
    
    e.preventDefault()
    // const convertedDate = moment(this.state.inputValue, moment.HTML5_FMT.DATETIME_LOCAL).unix()
    const convertedDate = moment(this.state.inputValue, moment.HTML5_FMT.DATE).unix()
    console.log("convertedDate", convertedDate)
    this.setState({unixDate: convertedDate})
  }
}


// Fallback for when native date input is not allowed https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
// how to do that in react?