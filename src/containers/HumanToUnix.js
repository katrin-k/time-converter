import React from 'react'
import Datehandler from '../Datehandler'
import Copybutton from '../components/Copybutton'
import Button from '../components/Button'
import './Conversions.css'

export default class HumanToUnix extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      radioValue: 'datetime-local',
      baseDate: null
    }
  }

  render() {
    const {baseDate, radioValue} = this.state
    const unixSeconds = baseDate ? baseDate.getUnix() : null
    const unixMilliseconds = baseDate ? baseDate.getUnixMs() : null

    let input = null
    if (radioValue === 'datetime-local' || radioValue === 'date') {
      input = <input 
        type={this.state.radioValue} 
        value={this.state.inputValue} 
        onChange={this.handleInputChange}/>
    } else if (radioValue === 'datetime-local-seconds') {
      input = <input 
        type="datetime-local" 
        step="1" 
        value={this.state.inputValue} 
        onChange={this.handleInputChange}/>
    } else if (radioValue === 'datetime-local-ms') {
      input = <input 
        type="datetime-local" 
        step="0.001" 
        value={this.state.inputValue} 
        onChange={this.handleInputChange}/>
    }

    return <section>
      <InputOptions initialValue={this.state.radioValue} onClick={this.handleRadioButtonChange}/>
      <form onSubmit={this.convertToUnixDate} onReset={this.handleReset} className="form-convert" >
        {input}
        <Button value="Convert to Unix Date" type="submit" />
        <Button value="Reset" type="reset" />
      </form>
      {baseDate
      ? <div className="result-block">
          {/* use map() to display results */}
          <div className="result-line" >
            <div className="result-title">Unix seconds:</div>
            <div>
              <span className="result-date">{unixSeconds}</span>
              <Copybutton copytext={unixSeconds} buttonText="time in s" />
            </div>
          </div>
          <div className="result-line" >
            <div className="result-title">Unix milliseconds:</div>
            <div>
              <span className="result-date">{unixMilliseconds}</span>
              <Copybutton copytext={unixMilliseconds} buttonText="time in ms" />
            </div>
            
          </div>
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

  handleReset = (e) => {
    e.preventDefault()
    this.setState({inputValue: ''})
  }

  convertToUnixDate = (e) => {
    e.preventDefault()
    this.setState({baseDate: Datehandler.make(this.state.inputValue)})
  }
}

class InputOptions extends React.Component {
  render() {
    const {initialValue} = this.props
    
    return (
      <form className="form-datetype">
        <label htmlFor="datetime" className="label-radio">
          <input type="radio" id="datetime" name="dateOptions" value="datetime-local" onChange={this.handleOption} checked={initialValue === 'datetime-local'} />
          Date & Time
        </label>
        <label htmlFor="date" className="label-radio">
          <input type="radio" id="date" name="dateOptions" value="date" onChange={this.handleOption} checked={initialValue === 'date'} />
          Date only
        </label>
        <label htmlFor="datetime-sec" className="label-radio">
          <input type="radio" id="datetime-sec" name="dateOptions" value="datetime-local-seconds" onChange={this.handleOption} checked={initialValue === 'datetime-local-seconds'} />
          Date & Time (with seconds)
        </label>
        <label htmlFor="datetime-ms" className="label-radio">
          <input type="radio" id="datetime-ms" name="dateOptions" value="datetime-local-ms" onChange={this.handleOption} checked={initialValue === 'datetime-local-ms'} />
          Date & Time (with milliseconds)
        </label>
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