'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React = React,
    Component = _React.Component;

var TodoApp = function (_Component) {
  _inherits(TodoApp, _Component);

  function TodoApp(props, context) {
    _classCallCheck(this, TodoApp);

    var _this = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props, context));

    _this.onInputChange = function (event) {
      _this.setState({ inputText: event.target.value });
    };

    _this.handleSubmit = function (event) {
      var inputText = _this.state.inputText;
      if ((event.which === 13 || event.keyCode === 13) && inputText.trim() !== '') {
        var todos = _this.state.todos;

        _this.setState({
          todos: [{ value: inputText, done: false }].concat(_toConsumableArray(todos)),
          inputText: ""
        });
      };
    };

    _this.handleDelete = function (idx) {
      var todos = _this.state.todos;
      todos.splice(idx, 1);
      _this.setState({ todos: todos });
    };

    _this.handleCheck = function (idx) {
      var todos = _this.state.todos;
      var curTodo = todos[idx];
      todos.splice(idx, 1, {
        value: curTodo.value,
        done: !curTodo.done
      });
      _this.setState({ todos: todos });
    };

    _this.renderTodoItem = function (input, idx) {
      return React.createElement(TodoItem, {
        content: input["value"],
        done: input["done"],
        key: idx,
        onCancel: function onCancel() {
          return _this.handleDelete(idx);
        },
        onCheckClick: function onCheckClick() {
          return _this.handleCheck(idx);
        }
      });
    };

    _this.state = {
      todos: [{ value: 'todo sample item 1', done: false }, { value: 'todo sample item 2', done: true }],
      inputText: ''
    };
    return _this;
  }

  _createClass(TodoApp, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          todos = _state.todos,
          inputText = _state.inputText;

      return React.createElement(
        'section',
        { className: 'todoapp' },
        React.createElement(
          'h1',
          null,
          'Todo List'
        ),
        React.createElement('input', {
          value: inputText,
          onChange: this.onInputChange,
          onKeyDown: this.handleSubmit,
          className: 'new-todo'
        }),
        React.createElement(
          'ul',
          { className: 'todo-list' },
          todos.map(function (item, idx) {
            return _this2.renderTodoItem(item, idx);
          })
        ),
        React.createElement(CountDisplay, { todos: this.state.todos })
      );
    }
  }]);

  return TodoApp;
}(Component);

var TodoItem = function (_React$Component) {
  _inherits(TodoItem, _React$Component);

  function TodoItem() {
    _classCallCheck(this, TodoItem);

    return _possibleConstructorReturn(this, (TodoItem.__proto__ || Object.getPrototypeOf(TodoItem)).apply(this, arguments));
  }

  _createClass(TodoItem, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      var done = this.props.done;

      return React.createElement(
        'li',
        { className: done ? "completed" : "" },
        React.createElement('input', {
          className: 'toggle',
          type: 'checkbox',
          checked: done,
          onChange: function onChange(event) {
            return _this4.props.onCheckClick();
          }
        }),
        React.createElement(
          'label',
          null,
          this.props.content
        ),
        React.createElement('button', {
          className: 'destroy',
          onClick: function onClick(event) {
            return _this4.props.onCancel();
          } })
      );
    }
  }]);

  return TodoItem;
}(React.Component);

var CountDisplay = function (_React$Component2) {
  _inherits(CountDisplay, _React$Component2);

  function CountDisplay() {
    var _ref;

    var _temp, _this5, _ret;

    _classCallCheck(this, CountDisplay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this5 = _possibleConstructorReturn(this, (_ref = CountDisplay.__proto__ || Object.getPrototypeOf(CountDisplay)).call.apply(_ref, [this].concat(args))), _this5), _this5.renderLeftTodoNum = function () {
      var count = _this5.props.todos.filter(function (v) {
        return !v["done"];
      }).length;
      if (count > 1) {
        return React.createElement(
          'span',
          null,
          React.createElement(
            'strong',
            null,
            count
          ),
          ' items left'
        );
      } else if (count === 1) {
        return React.createElement(
          'span',
          null,
          React.createElement(
            'strong',
            null,
            '1'
          ),
          ' item left'
        );
      } else {
        return React.createElement(
          'span',
          null,
          'no item'
        );
      }
    }, _temp), _possibleConstructorReturn(_this5, _ret);
  }

  _createClass(CountDisplay, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'footer',
        { className: 'todo-count' },
        this.renderLeftTodoNum()
      );
    }
  }]);

  return CountDisplay;
}(React.Component);

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('root'));