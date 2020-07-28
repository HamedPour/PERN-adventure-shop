const path = require("path");
const pool = require("../models/db");

module.exports = {
  async getTodos(req, res) {
    try {
      const todoList = await pool.query("SELECT * FROM todo;");

      res.json(todoList.rows);
    } catch (err) {
      console.error(err.message);
    }
  },

  async getTodo(req, res) {
    try {
      const { id } = req.params;
      const todoItem = await pool.query(
        "SELECT * FROM todo WHERE todo_id = $1",
        [id]
      );
      res.json(todoItem.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  },

  async updateTodo(req, res) {
    try {
      // get id of target item and update it here
      const { id } = req.params;
      const { description } = req.body;

      const updatedTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *;",
        [description, id]
      );
      res.json(updatedTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  },

  async deleteTodo(req, res) {
    try {
      // get id of target item and update it here
      const { id } = req.params;

      const deletedTodo = await pool.query(
        "DELETE from todo WHERE todo_id = $1 RETURNING *;",
        [id]
      );
      res.json(deletedTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  },

  async createToDo(req, res) {
    try {
      const { description } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES ($1) RETURNING *;",
        [description]
      );

      res.json(newTodo.rows[0]);
    } catch (err) {
      res.status(400).send({
        error: err.message,
      });
    }
  },

  catchAll(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  },
};
