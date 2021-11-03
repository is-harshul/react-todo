import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import TodoList from './Components/TodoList/TodoList';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h2>Todo List</h2>
      </header>
      <TodoList />
    </div>
  );
}

export default App;
