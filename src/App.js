import React, { Component } from 'react';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import './App.css';

// we create the Subject
const createTodos = new Subject();
const currentInput = new Subject();

class App extends Component{
  // We define some intial state for the component
  state = {
    todos: [],
    input: '',
  };

  componentDidMount() {
    // We update the state in our subscribe callback
    createTodos.subscribe(() => {
      this.setState({
        input: '',
        todos: this.state.todos.concat({
          text: this.state.input,
          done: false
        })
     });
    });

    currentInput.subscribe(input => this.setState({ input }));
  }

  render() {
    // We render the number and the buttons for adding +1 or -1.
    return (
      <div className="App-intro">
        <div className="number">{this.state.number}</div>
        <input
          type="text"
          autoFocus
          placeholder="Type in something to do."
          value={this.state.input}
          onChange={(e) => currentInput.next(e.target.value)}
        />
        <button onClick={() => createTodos.next()}>Add to list</button>
        <ul>
          {this.state.todos.map(({text, done}, index) => {
            return (
              <li key={index}>
                <input checked={done} type="checkbox" value="" /> {text}
              </li>
            )})}
        </ul>
      </div>
    );
  }
}

export default App;
