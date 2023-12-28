import pool from "../db.js";

const ProfileController = {
  updateUserInfo: async (req, res) => {
    try {
      let currentUserID = req?.params?.userID;
      let newData = req?.body;
      let message = await pool.query(`UPDATE public."User"
      SET
        email = '${newData.email}',
        phone = '${newData.phone}',
        location = '${newData.location}',
        available_tm = ${newData.available_tm},
        available_con = ${newData.available_con}
      WHERE
        user_id = ${currentUserID}; `);
      res
        .status(201)
        .json({ message: "User data updated successfully", message });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while updating data. Please try again.",
      });
    }
  },

  updateAbout: async (req, res) => {
    try {
      let currentUserID = req?.params?.userID;
      let about = req?.body.about;
      let message = await pool.query(`UPDATE public."User"
      SET
        about = '${about}'
      WHERE
        user_id = ${currentUserID}; `);
      res
        .status(201)
        .json({ message: "User about updated successfully", message });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while updating about. Please try again.",
      });
    }
  },

  getUserInfo: async (req, res) => {
    try {
      let currentUserID = req?.params?.userID;
      let userInfo = await pool.query(
        `SELECT * FROM public."User" WHERE user_id = ${currentUserID}`
      );

      res.status(201).json({ message: "Got userinfo successfully.", userInfo });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while getting user info. Please try again.",
      });
    }
  },
  updateSkills: async (req, res) => {
    try {
      let currentUserID = req?.params?.userID;
      let skill = req?.body.skill;
      let message = await pool.query(`UPDATE public."User"
      SET skills = array_append(skills, '${skill}')
      WHERE user_id = ${currentUserID}; `);
      res
        .status(201)
        .json({ message: "User skills updated successfully", message });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while updating skills. Please try again.",
      });
    }
  },
  removeSkill: async (req, res) => {
    try {
      let currentUserID = req?.params?.userID;
      let index = req?.body.index;
      let message = await pool.query(`UPDATE public."User"
      SET skills = skills[1:${index} - 1] || skills[${index} + 1:]
      WHERE user_id = ${currentUserID};
       `);
      res
        .status(201)
        .json({ message: "User skills updated successfully", message });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while updating skills. Please try again.",
      });
    }
  },
};

export default ProfileController;
