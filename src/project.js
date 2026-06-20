function createProject(title, id = crypto.randomUUID()) {
  let _id = id;
  let _title = title;
  let _todos = [];

  const getId = () => _id;

  const getTitle = () => _title;

  const setTitle = (title) => {
    _title = title;
  };

  const addTodo = (todo) => {
    _todos.push(todo);
  };

  const removeTodo = (todoId) => {
    _todos = _todos.filter((todo) => todo.getId() !== todoId);
  };

  const getTodos = () => _todos;

  const getTodoById = (todoId) =>
    _todos.find((todo) => todo.getId() === todoId);

  const toJSON = () => {
    return {
      id: _id,
      title: _title,
      todos: _todos.map((todo) => todo.toJSON()),
    };
  };

  return {
    getId,
    getTitle,
    setTitle,
    addTodo,
    removeTodo,
    getTodos,
    getTodoById,
    toJSON,
  };
}

export { createProject };
