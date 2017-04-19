import React, { Component } from 'react';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import './App.css';

// First we create our event streams, for tracking the current input and creating todos
const createTodo = new Subject();
const currentInput = new Subject();
const updateTodo = new Subject();
const deleteTodo = new Subject();

class App extends Component{
  // We define some intial state for the component
  state = {
    todos: [],
    input: '',
  };

  componentDidMount() {
    // We update the state when a todo is created
    createTodo.subscribe(() => {
      this.setState({
        input: '',
        todos: this.state.todos.concat({
          text: this.state.input,
          done: false
        })
      });
    });

    // We update the state when the input changes
    currentInput.subscribe(input => this.setState({ input }));

    // We update the state when a todo gets deleted
    deleteTodo.subscribe((index) => {
      console.log(index, this.state.todos);
      this.setState({ todos: this.state.todos.filter((_, _index) => index !== _index)});
    });

    // We update the a todo when it gets updated
    updateTodo.subscribe(({ index, ...obj }) => {
      this.state.todos[index] = Object.assign({}, this.state.todos[index], obj);
      this.setState({ todos: this.state.todos });
    });
  }

  render() {
    // We render the interface, bind callbacks from the input field and the "add to list" button to our Subjects and display the todos in a list below
    return (
      <div className="App-intro">
        <input
          type="text"
          autoFocus
          placeholder="Type in something to do."
          value={this.state.input}
          onChange={(e) => currentInput.next(e.target.value)}
        />
        <button onClick={() => createTodo.next()}>Add to list</button>
        <ul>
          {this.state.todos.map(({text, done}, index) => {
            return (
              <li key={index}>
                <input onChange={() => updateTodo.next({ index, done: !done })} checked={done} type="checkbox" value="" />
                { done === true ? (<strike>{text}</strike>) : text}
                <button onClick={() => deleteTodo.next(index)}>Delete</button>
              </li>
            )})}
        </ul>
      </div>
    );
  }
}

export default App;
