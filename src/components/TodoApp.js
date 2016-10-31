import React, { Component } from 'react';

import TodoItem from './TodoItem';
import CountDisplay from './CountDisplay';


const generateInitTodos = (nTodos) => {
  const idxs = [...Array(nTodos).keys()];
  return idxs.map(idx => ({
    value: `todo sample item ${idx + 1}`,
    done: ((idx % 2) === 1),
  }));
};

class TodoApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos: generateInitTodos(3),
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
      key={`todo-item-key-for:${input.value}`}
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
