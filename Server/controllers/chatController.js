import pool from "../db.js";

const chatController = {
  sendMessage: async (req, res) => {
    try {
      const { senderID, receiverID, text } = req.body;
      let message = await pool.query(
        `INSERT INTO PUBLIC."Message" (sender_id,receiver_id,text,timestamp) 
          VALUES (${senderID},${receiverID},'${text}',CURRENT_TIMESTAMP AT TIME ZONE 'UTC');`
      );
      res.status(201).json({ message: "User created successfully", message });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while sending your message.Please try again.",
      });
    }
  },

  getLastMessages: async (req, res) => {
    try {
      let currentUserID = req?.params?.userID;
      let lastMessages = await pool.query(`WITH LastMessages AS (
        SELECT *,
            ROW_NUMBER() OVER (PARTITION BY CASE
                                WHEN sender_id = ${currentUserID} THEN sender_id || '_' || receiver_id
                                WHEN receiver_id = ${currentUserID} THEN receiver_id || '_' || sender_id
                                END
                            ORDER BY timestamp DESC) AS rn
        FROM PUBLIC."Message"
        WHERE sender_id = ${currentUserID} OR receiver_id = ${currentUserID}
    )
    SELECT
    lm.sender_id ,
    lm.receiver_id ,
    lm.text,
    lm.timestamp,
    sender_user.firstname AS sender_firstname,
    sender_user.lastname AS sender_lastname,
    sender_user.picture AS sender_picture,
    sender_user.isonline AS sender_isonline,
    receiver_user.firstname AS receiver_firstname,
    receiver_user.lastname AS receiver_lastname,
    receiver_user.picture AS receiver_picture,
    receiver_user.isonline AS receiver_isonline
    FROM LastMessages lm
    JOIN PUBLIC."User" sender_user ON lm.sender_id = sender_user.user_id
    JOIN PUBLIC."User" receiver_user ON lm.receiver_id = receiver_user.user_id
    WHERE rn = 1
    ORDER BY timestamp DESC;`);

      lastMessages = lastMessages.rows;
      // console.log(lastMessages);
      lastMessages.map((el) => {
        el.is_curr_user_sender = el.sender_id === currentUserID;
        el.other_id = el.is_curr_user_sender ? el.receiver_id : el.sender_id;
        el.hour = el.timestamp.getHours() + ":" + el.timestamp.getMinutes();
        el.date =
          el.timestamp.getFullYear() +
          "/" +
          (el.timestamp.getMonth() + 1) +
          "/" +
          el.timestamp.getDate();
        // console.log(el.date);
        if (el.is_curr_user_sender) {
          el.name = el.receiver_firstname + " " + el.receiver_lastname;
          el.picture = el.receiver_picture;
          el.is_online = el.receiver_isonline;
        } else {
          el.name = el.sender_firstname + " " + el.sender_lastname;
          el.picture = el.sender_picture;
          el.is_online = el.sender_isonline;
        }
        console.log(el);
        delete el.sender_firstname;
        delete el.sender_lastname;
        delete el.sender_picture;
        delete el.sender_isonline;
        delete el.receiver_firstname;
        delete el.receiver_lastname;
        delete el.receiver_picture;
        delete el.receiver_isonline;
        delete el.sender_id;
        delete el.receiver_id;
      });

      // console.log(currentUserID);
      // console.log(lastMessages);
      res
        .status(201)
        .json({ message: "Have Got the messages successfully.", lastMessages });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error:
          "An error occurred while getting your last messages. Please try again.",
      });
    }
  },

  getMessages: async (req, res) => {
    try {
      let currentUserID = req?.params?.currUserID;
      let otherUserID = req?.params?.otherUserID;
      let messages = await pool.query(`WITH CHAT_CONVERSATION AS (
        (SELECT * FROM PUBLIC."Message" 
         WHERE sender_id = ${currentUserID} AND receiver_id = ${otherUserID}
    UNION
        (SELECT * FROM PUBLIC."Message"
         WHERE sender_id = ${otherUserID} AND receiver_id = ${currentUserID})
    ORDER BY timestamp ASC))
    SELECT 
    sender.picture AS sender_picture ,
    sender_id,receiver_id,text,timestamp
    FROM 
    CHAT_CONVERSATION CC 
    JOIN PUBLIC."User" sender on CC.sender_id = sender.user_id
    JOIN PUBLIC."User" receiver on CC.receiver_id = receiver.user_id
  ORDER BY timestamp ASC;
      `);
      messages = messages.rows;

      messages.map((el) => {
        el.is_own_message = el.sender_id === currentUserID;
        el.hour =
          el.timestamp.getHours() +
          ":" +
          (el.timestamp.getMinutes() < 10 ? "0" : "") +
          el.timestamp.getMinutes();
        // console.log(el.hour);
        el.date =
          el.timestamp.getFullYear() +
          "/" +
          (el.timestamp.getMonth() + 1) +
          "/" +
          el.timestamp.getDate();
        // console.log(el);
        delete el.sender_id;
        delete el.receiver_id;
      });
      res
        .status(201)
        .json({ message: "Have Got the messages successfully.", messages });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error:
          "An error occurred while getting your last messages. Please try again.",
      });
    }
  },
};

export default chatController;
