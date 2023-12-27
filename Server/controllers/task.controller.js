

import pool from "../db.js";

const taskController = {

    // updateavailable: async(req,res) => {

    // },

    gettaskswithtmid: async(req,res) => {
        try {
            let partid = req?.params?.partid;
            let projectid = req?.params?.projectid;
            // let ans = await pool.query(`select part_id,partname,username,email from public."User",public."Part" where project_id=${pmid} and taskmanager_id=user_id ;`);
            let ans = await pool.query(`
                        SELECT
                        t.task_id,
                        t.taskname,
                        t.price,
                        t.requirements,
                        u.username,
                        u.email
                    FROM
                        public."Task" t
                    LEFT JOIN
                        public."User" u ON t.contributor_id = u.user_id
                    WHERE
                        t.project_id = ${projectid} and
                        t.part_id = ${partid};
            `);
            ans=ans.rows;
            res
            .status(201)
            .json({message: " succedded" , ans});
            }
            catch(error){
                res
                .status(500)
                .json({ message: " error" , error });
            }
    },

    
    getpartinfo: async(req,res) => {
        try {
            let partid = req?.params?.partid;
            let projectid = req?.params?.projectid;
            // let ans = await pool.query(`select part_id,partname,username,email from public."User",public."Part" where project_id=${pmid} and taskmanager_id=user_id ;`);
            let ans = await pool.query(`
            SELECT
            p.partname,
            u.username,
            u.email
        FROM
            public."Part" p
        LEFT JOIN
            public."User" u ON p.taskmanager_id = u.user_id
        WHERE
            p.project_id = ${projectid} and
            p.part_id = ${partid};
            `);
            ans=ans.rows;
            res
            .status(201)
            .json({message: " succedded" , ans});
            }
            catch(error){
                res
                .status(500)
                .json({ message: " error" , error });
            }
    }

};
export default taskController;
