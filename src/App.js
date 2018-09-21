import React, { Component } from 'react';
import './App.css';
import routes from './routes'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}


