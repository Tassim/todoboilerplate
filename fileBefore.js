const express = require('express');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'todos_db', // trailing comma in case someone wants to write code after this
}).promise(); // make promisse to every route using mysql

const PORT = 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// the route below is for mysql
// app.get('/api/todos', async (req, res) => {
//   const query = 'SELECT * FROM todos;';
//   connection.query(query, (err, todos) => {
//     if (err) throw err;
//     res.json(todos);
//   });
// });

app.get('/api/todos', async (req, res) => {
  const query = 'SELECT * FROM todos;';
  try {
    const [todos] = await connection.query(query);
    res.status(200).json(todos);
  } catch (e) {
    res.status(403).json({ e });
  }
});

app.get('/api/todos/:id', async (req, res) => {
  const query = 'SELECT * FROM todos WHERE ?;';
  const { id } = req.params;
  try {
    const [todos] = await connection.query(query, { id });
    console.log(todos);
    res.status(200).json(todos);
  } catch (e) {
    res.status(403).json({ e });
  }
});

app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  if(!text) {
    return res.json({ error: 'You must provide text for todos '});
  }
  const query = 'INSERT INTO todos SET ?;';
  try {
    const [response] = await connection.query(query, { task: text });
    const query2 = 'SELECT * FROM todos WHERE ?;';
    const [todos] = await connection.query(query2, { id: response.insertId });
    res.json(todos[0]);
  } catch (e) {
    res.status(403).json({ e });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  // should delete a todo with that specific id from params AND
  const query = 'DELETE FROM todos WHERE ?;';
  try {
    const [response] = await connection.query(query, { id } );
    // should return to me all of thetodos from the database as a response
    const getTodos = 'SELECT * FROM todos;';
    const [todos] = await connection.query(getTodos);
    res.json(todos);
  } catch (e) {
    res.status(403).json({ e });
  }
});

// patch is to update 1 propriety of some data
app.patch ('/api/todos/:id', async (req, res) => {
// you will pull out the id from req.params
const { id } = req.params;
// you will pull out the text from req.body
const { task } = req.body;
// query your database to update that specific todo by it's id
const query = 'UPDATE todos SET ? WHERE ?;';
// You will update the text of that todo into what the user is updating it to
try { 
  const [response] = await connection.query(query, [{ task } , { id }] );
// after you update the data, send back that newly updated data as response
  const getTodos = 'SELECT * FROM todos WHERE ?;';
  const [todos] = await connection.query(getTodos, { id });
  res.json(todos[0]);
} catch (e) {
  res.status(403).json({ e });
}
});

// put is for updating multiple proprieties of some data
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const query = 'SELECT * FROM todos WHERE ?;';
  try {
    const [todos] = await connection.query(query, { id });
    const foundTodo = todos[0];
    const updateTodoById = 'UPDATE todos SET ?, ? WHERE ?;';
    await connection.query(updateTodoById, [{ task }, {completed: !foundTodo.completed}, { id }]);
    const [todosUpdated] = await connection.query(query, { id });
    const updatedTodo = todosUpdated[0];
    res.json(updatedTodo);
  } catch (e) {
    res.status(403).json({ e });
  }
});



app.listen(PORT);