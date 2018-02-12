import React, { Component } from 'react';
import Timerwrapper from './Timer'
import UnixToHuman from './UnixToHuman'
import HumanToUnix from './HumanToUnix'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="wrapper">
            <h2>Time converter</h2>
            <p>Current status: Converting to unix date uses the HTML <code>datetime</code> input which is only fully supported by Chrome at this point :(.<br/>
            Fallback or plugin is on the list…</p>
          </div>
        </header>
        <div className="wrapper">
          <ToggleWrapper title="Timer">
            <Timerwrapper />
          </ToggleWrapper>
          <ToggleWrapper title="Convert to unix date">
            <HumanToUnix />
          </ToggleWrapper>
          <ToggleWrapper title="Convert unix to human readable date">
            <UnixToHuman />
          </ToggleWrapper>
        </div>
      </div>
    );
  }
}

export default App;

class ToggleWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: false
    }
  }

  render() {
    const {toggled} = this.state
    const toggleIconStyle = toggled ? 'arrow-down' : 'arrow-left'

    return <div>

      <h2 className={toggleIconStyle} onClick={this.changeToggle}>{this.props.title}</h2>
      {this.state.toggled ? this.props.children : null}
    </div>
  }

  changeToggle = () => {
    this.setState({toggled: !this.state.toggled})
  }
}