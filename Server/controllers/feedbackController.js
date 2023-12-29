import pool from "../db.js";

const feedbackController = {
  getForProjectManagersAllTaskManagers: async (req, res) => {
    try {
      let projectManagerID = req?.params?.projectManagerID;
      let taskManagers =
        await pool.query(`WITH TaskManagers AS(SELECT part.partname , part.part_id , part.taskmanager_id,project.project_id
        FROM PUBLIC."Project" project , PUBLIC."Part" part
        WHERE
        project.project_id = part.project_id AND
        project.manager_id = ${projectManagerID} AND
        part.taskmanager_id IS NOT NULL)
        
        SELECT 
        tm.partname,tm.part_id,tm.project_id,tm.taskmanager_id,u.firstname,u.lastname ,u.picture
        
        FROM PUBLIC."User" u , TaskManagers tm
        WHERE
        tm.taskmanager_id = u.user_id
        ;
        `);
      taskManagers = taskManagers.rows;
      res.status(201).json({
        message: "Have Got the task managers successfully.",
        taskManagers,
      });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while sending your message.Please try again.",
        error,
      });
    }
  },
  getForTaskManagersAllContributors: async (req, res) => {
    try {
      let taskManagerID = req?.params?.taskManagerID;
      let contributors =
        await pool.query(`WITH Contributors AS(SELECT task.taskname , task.task_id , task.contributor_id,task.project_id
            FROM PUBLIC."Task" task , PUBLIC."Part" part
            WHERE
            part.part_id = task.part_id AND
            part.taskmanager_id = ${taskManagerID} AND
            task.contributor_id IS NOT NULL)
            
            SELECT 
            con.taskname,con.task_id,con.contributor_id,con.project_id,u.firstname,u.lastname ,u.picture
            
            FROM  Contributors con , PUBLIC."User" u
            WHERE con.contributor_id = u.user_id
            ;
        `);
      contributors = contributors.rows;
      res.status(201).json({
        message: "Have Got the task managers successfully.",
        contributors,
      });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while sending your message.Please try again.",
        error,
      });
    }
  },
  giveFeedBack: async (req, res) => {
    try {
      const { manager_id, staffmember_id, project_id, rating, comment_text } =
        req?.body;

      let count =
        await pool.query(`SELECT COUNT(*) AS feedbacks FROM PUBLIC."Feedback"
      WHERE manager_id = ${manager_id} AND staffmember_id = ${staffmember_id} AND project_id = ${project_id};`);
      count = count.rows[0].feedbacks;

      if (count) {
        let updateFeedback = await pool.query(`UPDATE PUBLIC."Feedback" 
          SET rating = ${rating} , comment_text = '${comment_text}'
          WHERE manager_id = ${manager_id} AND staffmember_id = ${staffmember_id} AND project_id = ${project_id};`);

        updateFeedback = updateFeedback.rows;

        res.status(201).json({
          message: "Have Inserted the Feedback successfully.",
          updateFeedback,
        });
      } else {
        let insertFeedback =
          await pool.query(`INSERT INTO PUBLIC."Feedback" (manager_id , staffmember_id,project_id,rating,comment_text)
        VALUES (${manager_id},${staffmember_id},${project_id},${rating},'${comment_text}');`);

        insertFeedback = insertFeedback.rows;

        res.status(201).json({
          message: "Have Inserted the Feedback successfully.",
          insertFeedback,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while sending your message.Please try again.",
        error,
      });
    }
  },
};

export default feedbackController;
