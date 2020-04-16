import React, { Component } from 'react';
import '../styles/App.css';
import TasksContainer from "./TasksContainer";

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TasksContainer />
        </header>
        
      </div>
    );
  }
}

export default App;
