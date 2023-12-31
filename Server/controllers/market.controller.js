import pool from "../db.js";
import { addSchema, deleteSchema } from "../models/market.js";
const marketController = {
  Add: async (req, res) => {
    const { error } = addSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      return res.status(422).json(error.details);
    }
    try {
      const { projectID, price } = req.body;
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      let offer =
        await pool.query(`INSERT INTO public."Offer" (project_id,startdate,price) 
                                      VALUES ('${projectID}',
                                       '${formattedDate}', ${price});`);
      console.log(offer);
      let offers =
        await pool.query(`select m.*, u.username,u.picture,u.user_id, pro.projectname ,pro.description 
      from public."Offer" m , public."Project" pro, public."User" u  where m.project_id = pro.project_id and pro.manager_id = u.user_id;`);
      let ranks =
        await pool.query(`SELECT pro.manager_id ,avg(pu.rating) as rank
      FROM public."Purchase" pu, public."Offer" o, public."Project" pro
          WHERE 
          pu.offer_id = o.offer_id AND
          o.project_id = pro.project_id
      group by pro.manager_id order by pro.manager_id asc;`);

      res
        .status(201)
        .json({ message: "Offers Got successfully", offers, ranks });
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
      let offers =
        await pool.query(`select m.*, u.username,u.picture,u.user_id, pro.projectname ,pro.description 
      from public."Offer" m , public."Project" pro, public."User" u  where m.project_id = pro.project_id and pro.manager_id = u.user_id;`);
      let ranks =
        await pool.query(`SELECT pro.manager_id ,avg(pu.rating) as rank
      FROM public."Purchase" pu, public."Offer" o, public."Project" pro
          WHERE 
          pu.offer_id = o.offer_id AND
          o.project_id = pro.project_id
      group by pro.manager_id order by pro.manager_id asc;`);

      res
        .status(201)
        .json({ message: "Offers Got successfully", offers, ranks });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while getting your offers.Please try again.",
      });
    }
  },
};
export default marketController;
