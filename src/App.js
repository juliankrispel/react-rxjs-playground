import React, { Component } from 'react';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import './App.css';

// we create the Subject
const stream = new Subject();

class App extends Component{
  // We define some intial state for the component
  state = {
    number: 0
  };

  componentDidMount() {
    // We update the state in our subscribe callback
    stream.subscribe((val) => this.setState({ number: this.state.number + val  }));
  }

  render() {
    // We render the number and the buttons for adding +1 or -1.
    return (
      <div className="App-intro">
        <div>{this.state.number} -</div>
        <button onClick={() => stream.next(1)}>Plus</button>
        <button onClick={() => stream.next(-1)}>Minus</button>
      </div>
    );
  }
}

export default App;
