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
          <h2>Time converter</h2>
        </header>
        <Timerwrapper />
        <HumanToUnix />
        <UnixToHuman />
      </div>
    );
  }
}

export default App;
