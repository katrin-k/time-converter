import React from 'react';
import Datehandler from './Datehandler';
import Copybutton from './Copybutton'
import Button from './Button'
import './Button.css'

export default class UnixToHuman extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      baseDate: null
    }
  }

  render() {
    const {baseDate} = this.state
    
    const en12Hrs = baseDate ? baseDate.get12Hrs() : null
    const en24Hrs = baseDate ? baseDate.get24Hrs() : null
    const iso8601 = baseDate ? baseDate.getIso8601() : null
    const iso8601UTC = baseDate ? baseDate.getIso8601Utc() : null
    const iso8601UTCMs = baseDate ? baseDate.getIso8601UtcMs() : null
    const rfc2822 = baseDate ? baseDate.getRfc2822() : null

    return <section>
      <h2>Convert unix to human readable date</h2>
      <form onSubmit={this.convertToHumanDate} className="form-convert" >
        <input type="number" value={this.state.inputValue} onChange={this.handleInputChange} />
        <Button value="Convert to Human readable Date" />
      </form>
      {baseDate
      ? <div className="result-block">
          <p className="result-line">
            <span className="result-span" >EN 12 hours, your time zone: {en12Hrs}</span>
            <Copybutton copytext={en12Hrs} />
          </p>
          <p className="result-line">
            <span className="result-span" >EN 24 hours, your time zone: {en24Hrs}</span>
            <Copybutton copytext={en24Hrs} />
          </p>
          <p className="result-line">
            <span className="result-span" >ISO 8601 UTC: {iso8601UTC}</span>
            <Copybutton copytext={iso8601UTC} />
          </p>
          <p className="result-line">
            <span className="result-span" >ISO 8601 UTC with milliseconds: {iso8601UTCMs}</span>
            <Copybutton copytext={iso8601UTCMs} />
          </p>
          <p className="result-line">
            <span className="result-span" >ISO 8601 / RFC 3339, your time zone: {iso8601}</span>
            <Copybutton copytext={iso8601} />
          </p>
          <p className="result-line">
            <span className="result-span" >RFC 2822, your time zone: {rfc2822}</span>
            <Copybutton copytext={rfc2822} />
          </p>
        </div>
      : null}
    </section>
  }

  handleInputChange = (event) => {
    this.setState({inputValue: event.target.value});
  }


  convertToHumanDate = (e) => {
    e.preventDefault()
    this.setState({baseDate: Datehandler.make(this.state.inputValue)})
  }
}