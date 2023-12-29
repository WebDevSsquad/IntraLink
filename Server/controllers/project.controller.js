import pool from "../db.js";
import { addSchema, deleteSchema } from "../models/project.js";
const projectController = {
  Add: async (req, res) => {
    const { error } = addSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      return res.status(422).json(error.details);
    }
    try {
      const { projectname, description } = req.body;
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      let post =
        await pool.query(`INSERT INTO public."Project" (projectname,description,startdate,manager_id) 
                                      VALUES ('${projectname}',
                                      '${description}',
                                      '${formattedDate}',
                                      '${req.user.user_id}'
                                      );`);

      let managerProjects = await pool.query(
        `select pro.* from  public."Project" pro
                                        where pro.manager_id = ${req.user.user_id};`
      );
      res
        .status(201)
        .json({ message: "Post created successfully", managerProjects });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while creating your Post.Please try again.",
      });
    }
  },
  Delete: async (req, res) => {
    const { error } = deleteSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(422).json(error.details);
    }

    try {
      const { postID } = req.body;

      await pool.query(`delete from public."Post" where postID='${postID}'`);

      res.status(200).json({ message: "Post Deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while logging you in. Please try again.",
      });
    }
  },
  Get: async (req, res) => {
    try {
      let managerProjects = await pool.query(
        `select pro.* from  public."Project" pro
        where pro.manager_id = ${req.user.user_id};`
      );
      let taskProjects = await pool.query(
        `select pro.* from  public."Project" pro,public."Part" p
        where (p.project_id = pro.project_id and p.taskmanager_id=${req.user.user_id});`
      );
      let conProjects = await pool.query(
        `select pro.* from  public."Project" pro,public."Task" t
        where (t.contributor_id = ${req.user.user_id} and pro.project_id = t.project_id);`
      );
      res
        .status(201)
        .json({
          message: "Projects Got successfully",
          managerProjects,
          taskProjects,
          conProjects,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while getting your Posts.Please try again.",
      });
    }
  },
};
export default projectController;
