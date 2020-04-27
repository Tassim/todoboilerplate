const express = require('express');
// The file name index is a special name in node, if we require a folder in node and we don't 
// specify a file name, Node will automatically look for an index.js inside of that folder
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// any route that goes to slash,
// have the router object inside of the routes
// handle the routing for us
app.use(routes);

// the route below is for mysql
// app.get('/api/todos', async (req, res) => {
//   const query = 'SELECT * FROM todos;';
//   connection.query(query, (err, todos) => {
//     if (err) throw err;
//     res.json(todos);
//   });
// });

// app.get('/api/todos', async (req, res) => {
//   const query = 'SELECT * FROM todos;';
//   try {
//     const [todos] = await connection.query(query);
//     res.status(200).json(todos);
//   } catch (e) {
//     res.status(403).json({ e });
//   }
// });

// app.get('/api/todos/:id', async (req, res) => {

// });

// app.post('/api/todos', async (req, res) => {

// });

// app.delete('/api/todos/:id', async (req, res) => {

// });

// // patch is to update 1 propriety of some data
// app.patch ('/api/todos/:id', async (req, res) => {
// // you will pull out the id from req.params
// const { id } = req.params;
// // you will pull out the text from req.body
// const { task } = req.body;
// // query your database to update that specific todo by it's id
// const query = 'UPDATE todos SET ? WHERE ?;';
// // You will update the text of that todo into what the user is updating it to
// try { 
//   const [response] = await connection.query(query, [{ task } , { id }] );
// // after you update the data, send back that newly updated data as response
//   const getTodos = 'SELECT * FROM todos WHERE ?;';
//   const [todos] = await connection.query(getTodos, { id });
//   res.json(todos[0]);
// } catch (e) {
//   res.status(403).json({ e });
// }
// });

// put is for updating multiple proprieties of some data
// app.put('/api/todos/:id', async (req, res) => {
  
// });

app.listen(PORT);
