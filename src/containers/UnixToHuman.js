import React from 'react';
import Datehandler from '../Datehandler';
import Copybutton from '../components/Copybutton'
import Button from '../components/Button'
import '../components/Button.css'

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
      <form onSubmit={this.convertToHumanDate} onReset={this.handleReset} className="form-convert" >
        <input type="number" value={this.state.inputValue} onChange={this.handleInputChange} />
        <Button value="Convert to Human readable Date" type="submit" />
        <Button value="Reset" type="reset" />
      </form>
      {baseDate
      ? <div className="result-block">
          {/* use map() to display results */}
          <div className="result-line">
            <div className="result-title">EN 12 hours, your time zone:</div>
            <div>
              <span className="result-date">{en12Hrs}</span>
              <Copybutton copytext={en12Hrs} />
            </div>
          </div>
          <div className="result-line">
            <div className="result-title">EN 24 hours, your time zone:</div>
            <div>
              <span className="result-date">{en24Hrs}</span>
              <Copybutton copytext={en24Hrs} />
            </div>
          </div>
          <div className="result-line">
            <div className="result-title" >ISO 8601 UTC:</div>
            <div>
              <span className="result-date">{iso8601UTC}</span>
              <Copybutton copytext={iso8601UTC} />
            </div>
          </div>
          <div className="result-line">
            <div className="result-title" >ISO 8601 UTC with milliseconds:</div>
            <div>
              <span className="result-date">{iso8601UTCMs}</span>
              <Copybutton copytext={iso8601UTCMs} />
            </div>
          </div>
          <div className="result-line">
            <div className="result-title" >ISO 8601 / RFC 3339, your time zone:</div>
            <div>
              <span className="result-date">{iso8601}</span>
              <Copybutton copytext={iso8601} />
            </div>
          </div>
          <div className="result-line">
            <div className="result-title" >RFC 2822, your time zone:</div>
            <div>
              <span className="result-date">{rfc2822}</span>
              <Copybutton copytext={rfc2822} />
            </div>
          </div>
        </div>
      : null}
    </section>
  }

  handleInputChange = (event) => {
    this.setState({inputValue: event.target.value});
  }

  handleReset = (e) => {
    e.preventDefault()
    this.setState({inputValue: ''})
  }

  convertToHumanDate = (e) => {
    e.preventDefault()
    this.setState({baseDate: Datehandler.make(this.state.inputValue)})
  }
}