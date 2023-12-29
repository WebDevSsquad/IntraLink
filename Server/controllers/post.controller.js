import pool from "../db.js";
import { addSchema, deleteSchema } from "../models/post.js";
const postController = {
  Add: async (req, res) => {
    const { error } = addSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      return res.status(422).json(error.details);
    }
    try {
      const { projectID, description, image } = req.body;
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      let post =
        await pool.query(`INSERT INTO public."Post" (project_id,description,image,publishdate) 
                                      VALUES ('${projectID}',
                                      '${description}',
                                      '${image}','${formattedDate}');`);
      console.log(post);
      let posts = await pool.query(
        `select po.*,u.username,u.picture,u.user_id from public."Post" po,public."Project" pro,public."User" u 
        where po.project_id=pro.project_id and pro.manager_id=u.user_id;`
      );
      res.status(201).json({ message: "Post created successfully", posts });
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

      await pool.query(`delete from public."Post" where post_id='${postID}'`);
      let posts = await pool.query(
        `select po.*,u.username,u.picture,u.user_id from public."Post" po,public."Project" pro,public."User" u 
        where po.project_id=pro.project_id and pro.manager_id=u.user_id;`
      );
      res.status(201).json({ message: "Post created successfully", posts });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while logging you in. Please try again.",
      });
    }
  },
  Get: async (req, res) => {
    try {
      let posts = await pool.query(
        `select po.*,u.username,u.picture,u.user_id from public."Post" po,public."Project" pro,public."User" u 
        where po.project_id=pro.project_id and pro.manager_id=u.user_id;`
      );
      let ranks =
        await pool.query(`SELECT pro.manager_id ,avg(pu.rating) as rank
      FROM public."Purchase" pu, public."Offer" o, public."Project" pro
          WHERE 
          pu.offer_id = o.offer_id AND
          o.project_id = pro.project_id
      group by pro.manager_id order by pro.manager_id asc;`);
      res.status(201).json({ message: "Posts Got successfully", posts, ranks });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while getting your Posts.Please try again.",
      });
    }
  },
};
export default postController;
