

import pool from "../db.js";

const subController = {

    // updateavailable: async(req,res) => {

    // },

    updateusersub: async(req,res) => {
        try {
            let userid = req?.params?.user_id;
            let data = req?.body;
            // let ans = await pool.query(`select part_id,partname,username,email from public."User",public."Part" where project_id=${pmid} and taskmanager_id=user_id ;`);
            let ans = await pool.query(`
                insert into  
                public."Subscription" (type,user_id,startdate,enddate,price)
                 values('${data.mode}',${userid},'${data.startdate}','${data.enddate}',${data.price});
            `);
            res
            .status(201)
            .json({message: " succedded"});
            }
            catch(error){
                res
                .status(500)
                .json({ message: " error" , error});
            }
    },
    
    getalluser: async(req,res) => {
        try {
            // let ans = await pool.query(`select part_id,partname,username,email from public."User",public."Part" where project_id=${pmid} and taskmanager_id=user_id ;`);
            let ans = await pool.query(`
                select * 
                from public."Subscription" ;
            `);
            ans=ans.rows;
            res
            .status(201)
            .json({message: " succedded" , ans});
            }
            catch(error){
                res
                .status(500)
                .json({ message: " error" , error});
            }
    },

};
export default subController;
