import React, { Component, PropTypes } from 'react';

class CountDisplay extends Component {
  renderLeftTodoNum = () => {
    const { todos } = this.props;
    const count = todos.filter(v => !v.done).length;
    if (count > 1) {
      return <span><strong>{count}</strong> items left</span>;
    } else if (count === 1) {
      return <span><strong>1</strong> item left</span>;
    }
    return <span>no item</span>;
  }

  render() {
    return (
      <footer className="todo-count">
        {this.renderLeftTodoNum()}
      </footer>
    );
  }
}

CountDisplay.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    done: PropTypes.bool.isRequired,
  })).isRequired,
};

export default CountDisplay;
