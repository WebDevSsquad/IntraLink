import pool from "../db.js";

const notifController = {
  getNotifications: async (req, res) => {
    try {
      let currentUserID = req?.params?.userID;
      let notifications = await pool.query(
        `SELECT 
        n.sender_id,
        n.receiver_id,
        n.project_id,
        u_sender.username AS sender_username, 
        u_sender.picture AS sender_user_image,
        p.projectname, 
        n.description, 
        n.date,
		n.type
        FROM 
            public."Notification" n
        JOIN 
            public."User" u_sender ON n.sender_id = u_sender.user_id
        JOIN 
            public."User" u_receiver ON n.receiver_id = u_receiver.user_id
        JOIN 
            public."Project" p ON n.project_id = p.project_id
        WHERE 
        n.receiver_id = ${currentUserID}; `
      );

      res
        .status(201)
        .json({ message: "Got notifications successfully.", notifications });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error:
          "An error occurred while getting notifications. Please try again.",
      });
    }
  },
  removeNotification: async (req, res) => {
    try {
      let sender = req?.body.sender;
      let receiver = req?.body.receiver;
      let project = req?.body.project;
      let message = await pool.query(`DELETE FROM public."Notification"
      WHERE sender_id = ${sender} AND receiver_id = ${receiver} AND project_id = ${project};
      ;
       `);
      res
        .status(201)
        .json({ message: "User notifications updated successfully", message });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error:
          "An error occurred while updating notifications. Please try again.",
      });
    }
  },
};

export default notifController;