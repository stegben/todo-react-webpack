const { Component } = React;


class TodoApp extends Component {
  constructor (props, context){
    super(props, context);
    this.state = {
      todos: [
        { value: 'todo sample item 1', done: false },
        { value: 'todo sample item 2', done: true },
      ],
      inputText: '',
    };
  }

  inputChange = (event) => {
    //this.state.inputText = event.target.value;
    this.setState({ inputText: event.target.value });
  }

  handleSubmit = (event) => {
    const inputText = this.state.inputText
    if ((event.which === 13 || event.keyCode === 13) && inputText !== '') {
      let origTodos = this.state.todos;
      this.setState({
        todos: [ 
          { value: inputText, done: false }, 
          ...origTodos,
        ],
        inputText: "",
      });
    };
  }

  handleDelete = (idx) => {
    let todos = this.state.todos;
    todos.splice(idx, 1);
    this.setState({ todos: todos });
  }

  handleCheck = (idx) => {
    let todos = this.state.todos;
    const cur_todo = todos[idx]
    todos.splice(idx, 1, {
      value: cur_todo.value,
      done: !cur_todo.done,
    });
    this.setState({ todos: todos });
  }

  renderTodoItem = (input, idx) => {
    return (
      <TodoItem
        content={input["value"]}
        done={input["done"]}
        key={idx}
        onCancel={() => this.handleDelete(idx)}
        onCheckClick={() => this.handleCheck(idx)}
      />
    );
  }

  render() {
    const { todos, inputText } = this.state;
    return (
      <section className="todoapp">
        <h1>Todo List</h1>
        <input
          value={inputText}
          onChange={this.inputChange}
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


class TodoItem extends React.Component {
  render() {
    const { done } = this.props;
    return (
      <li className={done? "completed" : ""}>
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={(event) => this.props.onCheckClick()}
        />
        <label>{this.props.content}</label>
        <button
          className="destroy"
          onClick={(event) => this.props.onCancel()}></button>
      </li>
    );
  }
}



class CountDisplay extends React.Component {
  render() {
    //const todos = this.props.todos;
    return (
      <footer className="todo-count">
        <span>
          <strong>
            {this.props.todos.filter((v) => !v["done"]).length}
          </strong> left
        </span>
      </footer>
    );
  };
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
