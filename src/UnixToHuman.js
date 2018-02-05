import React, { Component } from 'react';
import moment from 'moment'
import Copybutton from './Copybutton'
import Button from './Button'
import './Button.css'

export default class UnixToHuman extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      humanDate: null
    }
  }

  render() {
    const {humanDate} = this.state

    const en12Hrs = moment(humanDate).format("dddd, MMMM Do YYYY, h:mm:ss a")
    const en24Hrs = moment(humanDate).format("dddd, MMMM Do YYYY, H:mm:ss")
    const iso8601 = moment(humanDate, moment.ISO_8601).format()
    const iso8601UTC = moment.utc(humanDate).format()
    const iso8601UTCnative = moment.utc(humanDate).toISOString()
    const rfc2822 = humanDate ? moment(humanDate).format('dddd, DD-MMM-YY HH:mm:ss Z') : null

    return <section>
      <h2>Convert unix to human readable date</h2>
      <form onSubmit={this.convertToHumanDate} className="form-convert" >
        <input type="text" value={this.state.inputValue} onChange={this.handleInputChange} />
        <Button value="Convert to Human readable Date" />
      </form>
      {humanDate
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
            <span className="result-span" >ISO 8601 UTC with milliseconds: {iso8601UTCnative}</span>
            <Copybutton copytext={iso8601UTCnative} />
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
    const convertedDate = moment.unix(this.state.inputValue)
    this.setState({humanDate: convertedDate})
  }
}