import React, { Component } from 'react';
import moment from 'moment'
import Copybutton from '../components/Copybutton'
import './Timer.css'

export default class Timerwrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render(){
    const {date} = this.state
    const humanDate = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")
    const unixSecond = moment(date).unix()
    const unixMilliSeconds = Math.floor(date)

    return <section className="section-timer">
      <Timer text="Human readable:" date={humanDate} buttonText="datetime" />
      <Timer text="Unix second:" date={unixSecond} buttonText="time" />
      <Timer text="Unix millisecond:" date={unixMilliSeconds} buttonText="time" />
    </section>
  }
}

class Timer extends Component {
  render() {
    const {text, date} = this.props
    return <div className="timer">
      <div className="timer-text">{text}</div> 
      <div>{date}</div>
      <Copybutton copytext={date} buttonText={this.props.buttonText} />
    </div>
  }
}