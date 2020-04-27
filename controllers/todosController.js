const connection = require('../config/connection');
const todoQueries = require('../models/todos/todoQueries');

module.exports = {
  getAllTodos: async (req, res) => {
    try {
      const [todos] = await connection.query(todoQueries.findAllTodos);
      return res.status(200).json(todos);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  addTodo: async (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.json({ error: 'You must provide text for todos '});
    }
    try {
      const [response] = await connection.query(todoQueries.addTodo, { task: text });

      const [todos] = await connection.query(todoQueries.findTodoById, response.insertId);
      return res.json(todos[0]);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getTodoById: async (req, res) => {
    const { id } = req.params;
    try {
      const [todos] = await connection.query(todoQueries.findTodoById, id );
      res.status(200).json(todos);
    } catch (e) {
      res.status(403).json({ e });
    }
  },
  deleteTodoById: async (req, res) => {
    const { id } = req.params;
    // should delete a todo with that specific id from params AND
    try {
      const [response] = await connection.query(todoQueries.deleteTodoById, id );
      // should return to me all of thetodos from the database as a response
      const [todos] = await connection.query(todoQueries.findAllTodos);
      res.json(todos);
    } catch (e) {
      res.status(403).json({ e });
    }
  },
  updateTodoTextById: async (req, res) => {
    const { id } = req.params;
    // you will pull out the text from req.body
    const { task } = req.body;
    // query your database to update that specific todo by it's id
    // You will update the text of that todo into what the user is updating it to
    try {
      const [response] = await connection.query(todoQueries.updateTodoTextById, [task, id]);
      // after you update the data, send back that newly updated data as response
      const [todos] = await connection.query(todoQueries.findTodoById, id);
      res.json(todos[0]);
    } catch (e) {
      res.status(403).json({ e });
    }
  },
  updateMultipleById: async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    try {
      const [todos] = await connection.query(todoQueries.findTodoById, id);
      const foundTodo = todos[0];
      await connection.query(todoQueries.updateMultipleById, [task, !foundTodo.completed, id]);
      const [todosUpdated] = await connection.query(todoQueries.findTodoById, id);
      const updatedTodo = todosUpdated[0];
      res.json(updatedTodo);
    } catch (e) {
      res.status(403).json({ e });
    }
  },
};
