import React, { Component } from 'react';
import logo from './logo.svg';
import Rx from 'rxjs';
import './App.css';

var stream = new Rx.Subject();

stream.map(() => state => Object.assign({}, state, {count: state.count + 1}));
stream.subscribe(() => console.log('click'));

const App = () => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <div className="App-intro">
      <div>- number -</div>
      <button onClick={() => stream.next('+')}>Plus</button>
      <button onClick={() => stream.next('-')}>Minus</button>
    </div>
  </div>
);

export default App;
