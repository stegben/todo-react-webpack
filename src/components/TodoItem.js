import React, { PropTypes } from 'react';

const TodoItem = (props) => {
  const { done, onCheckClick, onCancel } = props;
  return (
    <li className={done ? 'completed' : ''}>
      <input
        id="todo-input-area"
        className="toggle"
        type="checkbox"
        checked={done}
        onChange={() => onCheckClick()}
      />
      <label htmlFor="todo-input-area">{props.content}</label>
      <button
        className="destroy"
        onClick={() => onCancel()}
      />
    </li>
  );
};

TodoItem.propTypes = {
  done: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCheckClick: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default TodoItem;
