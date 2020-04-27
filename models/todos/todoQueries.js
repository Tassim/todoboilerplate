// Get todos
const findAllTodos = 'SELECT * FROM todos';
const findAllCompleted = 'SELECT * FROM todos WHERE completed = true;';
const findAllIncompleted = 'SELECT * FROM todos WHERE completed = false;';
const findTodoById = 'SELECT * FROM todos WHERE id = ?;';

// adding todos
const addTodo = 'INSERT INTO todos SET ?';

// deleting todos
const deleteTodoById = 'DELETE FROM todos WHERE id= ?;';

// updating todos
const updateTodoTextById = 'UPDATE todos SET task = ? WHERE id = ?;';
const updateMultipleById = 'UPDATE todos SET task = ?, complete = ? WHERE id = ?;';

module.exports = {
  findAllTodos,
  findAllCompleted,
  findAllIncompleted,
  findTodoById,
  addTodo,
  deleteTodoById,
  updateTodoTextById,
  updateMultipleById,
};