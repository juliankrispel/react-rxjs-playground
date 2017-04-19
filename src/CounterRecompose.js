// default create-react-app imports for App.js
import React from 'react';
import './App.css';

// We'll need the Observable class as well as some helpers and hocs from recompose
import { Observable } from 'rxjs/Observable';
import componentFromStream from 'recompose/componentFromStream';
import createEventHandler from 'recompose/createEventHandler';

// we use setObservableConfig to tell recompose to use rxjs
import setObservableConfig from 'recompose/setObservableConfig';
import rxjsconfig from 'recompose/rxjsObservableConfig'
setObservableConfig(rxjsconfig)

const Counter = componentFromStream(props$ => {
  // createEventHandler gives us a `handler` and a `stream`, the handler lets us push values into the stream.
  const { handler: increment, stream: increment$ } = createEventHandler()
  const { handler: decrement, stream: decrement$ } = createEventHandler()

  // We're mapping the increment stream to produce +1 and the decrement stream to produce -1
  const count$ = Observable.merge(
      increment$.mapTo(1),
      decrement$.mapTo(-1)
    )
    // the new observable will have the starting value 0
    .startWith(0)
    // and with the scan method we can produce the sum of the current value plus the new value that entered the stream (either +1 or -1)
    .scan((count, n) => count + n, 0)

  // now we combine the props$ stream and the count$ stream to produce a component stream.
  return props$.combineLatest(
    count$,
    (props, count) =>
      <div className="App-intro" {...props}>
        <div className="number">Count: {count}</div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
  )
});

export default Counter;
