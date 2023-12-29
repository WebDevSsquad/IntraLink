import pool from "../db.js";

const avaController = {
  getusersavailable: async (req, res) => {
    try {
      let ans = await pool.query(
        `select user_id,username,email,available_con,available_tm from public."User" where available_con =true or available_tm=true ;`
      );
      ans = ans.rows;
      res.status(201).json({ message: " succedded", ans });
    } catch (error) {
      res.status(500).json({ message: " error to get available users", error });
    }
  },
  sendInvitation: async (req, res) => {
    try {
      let currentUserID = req?.params?.userID;
      let receiver = req?.body?.receiver;
      let description = req?.body?.description;
      let selectedProject = req?.body?.selectedProject;
      let date = req?.body?.date;

      let alreadySent = await pool.query(`SELECT EXISTS (
        SELECT 1
        FROM public."Notification"
        WHERE project_id = ${selectedProject} 
          AND sender_id = ${currentUserID} 
          AND receiver_id = ${receiver}
    ) AS exists_notification;`);

      if (!alreadySent.rows[0].exists_notification) {
        let message = await pool.query(`INSERT INTO public."Notification"
          VALUES(${selectedProject}, ${currentUserID}, ${receiver}, '${date}', 'invitation', '${description}'); `);
        res
          .status(201)
          .json({ message: "invitation sent successfully", message });
      } else {
        let message =
          await pool.query(`UPDATE  public."Notification" SET description='${description}', date='${date}'
        WHERE project_id = ${selectedProject} 
        AND sender_id = ${currentUserID} 
        AND receiver_id = ${receiver} ; `);
        res
          .status(201)
          .json({ message: "invitation sent successfully", message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while sending invite. Please try again.",
      });
    }
  },
};
export default avaController;
