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
          <Timerwrapper />
          <HumanToUnix />
          <UnixToHuman />
        </div>
      </div>
    );
  }
}

export default App;
