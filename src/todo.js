import { parseISO, isValid } from "date-fns";

function createTodo(title) {
  let _id = crypto.randomUUID();
  let _title = title;
  let _description = "";
  let _dueDate = null;
  let _priority = "normal";
  let _isComplete = false;

  const getId = () => _id;

  const getTitle = () => _title;

  const getDescription = () => _description;

  const getDueDate = () => _dueDate;

  const getPriority = () => _priority;

  const getIsComplete = () => _isComplete;

  const setTitle = (title) => {
    _title = title;
  };

  const setDescription = (description) => {
    _description = description;
  };

  const setDueDate = (dueDate) => {
    const dueDateObject = parseISO(dueDate);

    if (isValid(dueDateObject)) {
      _dueDate = dueDateObject;
    } else {
      _dueDate = null;
    }
  };

  const setPriority = (priority) => {
    _priority = priority;
  };

  const toggleComplete = () => {
    _isComplete = _isComplete ? false : true;
  };

  return {
    getId,
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getIsComplete,
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    toggleComplete,
  };
}

export { createTodo };
