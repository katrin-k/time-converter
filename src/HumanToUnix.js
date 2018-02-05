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
      radioValue: 'datetime-local',
      unixDate: null
    }
  }

  render() {
    const {unixDate, radioValue} = this.state
    const unixSeconds = unixDate ? moment(unixDate).unix() : null
    const unixMilliseconds = unixDate ? moment(unixDate).valueOf() : null
    

    // <input type={this.state.radioValue} value={this.state.inputValue} onChange={this.handleInputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
    // <input type={this.state.radioValue} step="1" value={this.state.inputValue} onChange={this.handleInputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
    // <input type={this.state.radioValue} step="0.001" value={this.state.inputValue} onChange={this.handleInputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
    let input = null
    if (radioValue === 'datetime-local' || radioValue === 'date') {
      input = <input type={this.state.radioValue} value={this.state.inputValue} onChange={this.handleInputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
    } else if (radioValue === 'datetime-local-seconds') {
      input = <input type="datetime-local" step="1" value={this.state.inputValue} onChange={this.handleInputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
    } else if (radioValue === 'datetime-local-ms') {
      input = <input type="datetime-local" step="0.001" value={this.state.inputValue} onChange={this.handleInputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
    }

    return <section>
      <h2>Convert to unix date</h2>
      <InputOptions initialValue={this.state.radioValue} onClick={this.handleRadioButtonChange}/>
      <form onSubmit={this.convertToUnixDate} className="form-convert" >
        {/* pattern… */}
        {input}
        <Button value="Convert to Unix Date" />
      </form>
      {unixDate
      ? <div className="result-block">
          <p className="result-line" >
            <span className="result-span">Unix seconds: {unixSeconds}</span>
            <Copybutton copytext={unixSeconds} buttonText="time in s" />
          </p>
          <p className="result-line" >
            <span className="result-span">Unix milliseconds: {unixMilliseconds}</span>
            <Copybutton copytext={unixMilliseconds} buttonText="time in ms" />
          </p>
        </div>
      : null}
    </section>
  }

  handleInputChange = (event) => {
    this.setState({inputValue: event.target.value});
  }

  handleRadioButtonChange = (value) => {
    this.setState({radioValue: value})
  }

  convertToUnixDate = (e) => {
    e.preventDefault()
    // adjust to account for different input values
    this.setState({unixDate: this.state.inputValue})
  }
}

class InputOptions extends Component {
  render() {
    const {initialValue} = this.props
    
    return (
      <form>
        <input type="radio" id="datetime" name="dateOptions" value="datetime-local" onChange={this.handleOption} checked={initialValue === 'datetime-local'} />
        <label htmlFor="datetime">Date & Time</label>
        <input type="radio" id="date" name="dateOptions" value="date" onChange={this.handleOption} checked={initialValue === 'date'} />
        <label htmlFor="date">Date only</label>
        <input type="radio" id="datetime-sec" name="dateOptions" value="datetime-local-seconds" onChange={this.handleOption} checked={initialValue === 'datetime-local-seconds'} />
        <label htmlFor="datetime-sec">Date & Time (with seconds)</label>
        <input type="radio" id="datetime-ms" name="dateOptions" value="datetime-local-ms" onChange={this.handleOption} checked={initialValue === 'datetime-local-ms'} />
        <label htmlFor="datetime-ms">Date & Time (with milliseconds)</label>
      </form>
    )
  }

  handleOption = (e) => {
    this.props.onClick(e.target.value)
  }
}

    // const convertedDate = moment(this.state.inputValue, moment.HTML5_FMT.DATETIME_LOCAL).unix()
    // const convertedDate = moment(this.state.inputValue, moment.HTML5_FMT.DATE).unix()

// Fallback for when native date input is not allowed https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
// how to do that in react?