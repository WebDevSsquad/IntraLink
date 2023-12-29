import pool from "../db.js";

const userDutiesController = {
  getUserProjects: async (req, res) => {
    try {
      let currentUserID = req?.params?.userID;
      let projects = await pool.query(
        `SELECT project_id,projectname,startdate,duedate,status FROM PUBLIC."Project" WHERE manager_id = ${currentUserID};`
      );
      projects = projects.rows;
      res
        .status(201)
        .json({ message: "Have Got the projects successfully.", projects });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while sending your message.Please try again.",
        error,
      });
    }
  },

  getUserTasks: async (req, res) => {
    try {
      let currentUserID = req?.params?.userID;
      let tasks = await pool.query(
        `SELECT taskname ,price,requirements FROM PUBLIC."Task" WHERE contributor_id = ${currentUserID};`
      );
      tasks = tasks.rows;
      res
        .status(201)
        .json({ message: "Have Got the projects successfully.", tasks });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while sending your message.Please try again.",
        error,
      });
    }
  },

  getUserParts: async (req, res) => {
    try {
      let currentUserID = req?.params?.userID;
      let parts = await pool.query(
        `SELECT part_id ,project_id,partname FROM PUBLIC."Part" WHERE taskmanager_id = ${currentUserID};`
      );
      parts = parts.rows;
      res
        .status(201)
        .json({ message: "Have Got the projects successfully.", parts });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while sending your message.Please try again.",
        error,
      });
    }
  },
};

export default userDutiesController;
