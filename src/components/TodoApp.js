import React, { Component } from 'react';

import TodoItem from './TodoItem';
import CountDisplay from './CountDisplay';


class TodoApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos: [
        { value: 'todo sample item 1', done: false },
        { value: 'todo sample item 2', done: true },
      ],
      inputText: '',
    };
  }

  onInputChange = (event) => {
    this.setState({ inputText: event.target.value });
  }

  handleSubmit = (event) => {
    const inputText = this.state.inputText;
    if ((event.which === 13 || event.keyCode === 13) && inputText.trim() !== '') {
      const { todos } = this.state;
      this.setState({
        todos: [
          ...todos,
          { value: inputText, done: false },
        ],
        inputText: '',
      });
    }
  }

  handleDelete = (idx) => {
    const todos = this.state.todos;
    todos.splice(idx, 1);
    this.setState({ todos });
  }

  handleCheck = (idx) => {
    const todos = this.state.todos;
    const curTodo = todos[idx];
    todos.splice(idx, 1, {
      value: curTodo.value,
      done: !curTodo.done,
    });
    this.setState({ todos });
  }

  renderTodoItem = (input, idx) => (
    <TodoItem
      content={input.value}
      done={input.done}
      key={idx}
      onCancel={() => this.handleDelete(idx)}
      onCheckClick={() => this.handleCheck(idx)}
    />
  )

  render() {
    const { todos, inputText } = this.state;
    return (
      <section className="todoapp">
        <h1>Todo List</h1>
        <input
          value={inputText}
          onChange={this.onInputChange}
          onKeyDown={this.handleSubmit}
          className="new-todo"
        />

        <ul className="todo-list">
          {todos.map((item, idx) => this.renderTodoItem(item, idx))}
        </ul>

        <CountDisplay todos={this.state.todos} />
      </section>
    );
  }
}

export default TodoApp;
