import { pool } from "../db.js";

export const getAllTasks = async (req, res, next) => {
  try {
    const allTask = await pool.query("SELECT * FROM task");
    res.json(allTask.rows);
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "tarea no encontrada" });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const result = await pool.query(
      "INSERT INTO task (title,description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id]);
    if(result.rows.length === 0) return res.status(404).json({ message: 'tarea no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id]);
    if(result.rows.length === 0) return res.status(404).json({ message: 'tarea no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error)
  }
};
