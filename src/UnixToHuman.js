import React, { Component } from 'react';
import moment from 'moment'
import Copybutton from './Copybutton'
import Button from './Button'

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
    const iso8601 = moment(humanDate, moment.ISO_8601).format()
    const iso8601UTC = moment.utc(humanDate).format()
    const iso8601UTCnative = moment.utc(humanDate).toISOString()
    const rfc2822 = humanDate ? moment(humanDate).format('dddd, DD-MMM-YY HH:mm:ss Z') : null
    


    return <section>
      <h2>Convert epoch/unix to human readable date</h2>
      <form onSubmit={this.convertToHumanDate} >
        <input type="text" value={this.state.inputValue} onChange={this.handleInputChange} />
        <Button value="Convert to Human readable Date" />
      </form>
      {humanDate
      ? <div>
          <p>ISO 8601 UTC: {iso8601UTC}</p><Copybutton copytext={iso8601UTC} />
          <p>ISO 8601 UTC with milliseconds: {iso8601UTCnative}</p><Copybutton copytext={iso8601UTCnative} />
          <p>ISO 8601 / RFC 3339 your time zone: {iso8601}</p><Copybutton copytext={iso8601} />
          <p>RFC 2822 your time zone: {rfc2822}</p><Copybutton copytext={rfc2822} />
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