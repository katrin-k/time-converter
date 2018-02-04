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
    const unixSeconds = unixDate ? moment(unixDate).unix() : null
    const unixMilliseconds = unixDate ? moment(unixDate).valueOf() : null
    
    return <section>
      <h2>Convert to epoch/unix date</h2>
      <form onSubmit={this.convertToUnixDate} className="form-convert" >
        {/* <input type="datetime-local" value={this.state.inputValue} onChange={this.handleInputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" /> */}
        <input type="date" value={this.state.inputValue} onChange={this.handleInputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
        <Button value="Convert to Unix Date" />
      </form>
      {unixDate
      ? <div className="result-block">
          <p className="result-line" >
            <span className="result-span" >Unix seconds: {unixSeconds}</span>
            <Copybutton copytext={unixSeconds} buttonText="time in s" />
          </p>
          <p className="result-line" >
            <span className="result-span" >Unix milliseconds: {unixMilliseconds}</span>
            <Copybutton copytext={unixMilliseconds} buttonText="time in ms" />
          </p>
        </div>
      : null}
    </section>
  }

  handleInputChange = (event) => {
    this.setState({inputValue: event.target.value});
  }


  convertToUnixDate = (e) => {
    e.preventDefault()
    this.setState({unixDate: this.state.inputValue})
  }
}


    // const convertedDate = moment(this.state.inputValue, moment.HTML5_FMT.DATETIME_LOCAL).unix()
    // const convertedDate = moment(this.state.inputValue, moment.HTML5_FMT.DATE).unix()

// Fallback for when native date input is not allowed https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
// how to do that in react?