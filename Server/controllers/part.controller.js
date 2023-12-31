

import pool from "../db.js";

const partController = {

    // updateavailable: async(req,res) => {

    // },

    getpartswithpmid: async(req,res) => {
        try {
            let pmid = req?.params?.projectid;
            // let ans = await pool.query(`select part_id,partname,username,email from public."User",public."Part" where project_id=${pmid} and taskmanager_id=user_id ;`);
            let ans = await pool.query(`
                        SELECT
                        p.part_id,
                        p.partname,
                        u.username,
                        u.email
                    FROM
                        public."Part" p
                    LEFT JOIN
                        public."User" u ON p.taskmanager_id = u.user_id
                    WHERE
                        p.project_id = ${pmid};
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

    
    getpminfo: async(req,res) => {
        try {
            let pmid = req?.params?.projectid;
            // let ans = await pool.query(`select part_id,partname,username,email from public."User",public."Part" where project_id=${pmid} and taskmanager_id=user_id ;`);
            let ans = await pool.query(`
                        SELECT
                        project_id,
                        projectname,
                        description,
                        startdate,
                        duedate,
                        status,
                        username,
                        email
                    FROM
                        public."Project",public."User"
                    WHERE
                        project_id = ${pmid} and manager_id=user_id;
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


//   signup: async (req, res) => {
//     // Validate the request body against the sign up schema
//     const { error } = signUpSchema.validate(req.body, { abortEarly: false });
//     if (error) {
//       console.log(error);
//       return res.status(422).json(error.details);
//     }
//     try {
//       const { email, password, username } = req.body;
//       // Check if the user already exists
//       let checkusername = await pool.query(`SELECT EXISTS (
//                                           SELECT 1
//                                           FROM public."User"
//                                           WHERE username = '${username}'
//                                         );`);
//       console.log(username);
//       console.log(checkusername);

//       if (checkusername.rows[0].exists) {
//         console.log("Username is already taken");
//         return res.status(400).json({ error: "Username is already taken" });
//       }

//       let checkEmail = await pool.query(`SELECT EXISTS (
//                                                 SELECT 1
//                                                 FROM public."User"
//                                                 WHERE email = '${email}'
//                                             );`);

//       if (checkEmail.rows[0].exists) {
//         console.log("Email is already taken");
//         return res.status(400).json({ error: "Email is already taken" });
//       }

//       // Hash the password before saving it to the database
//       const hashedPassword = await bcrypt.hash(password, 10);

//       let user =
//         await pool.query(`INSERT INTO public."User" (username,email,password,firstname,lastname) 
//                                   VALUES ('${req.body.username}',
//                                   '${req.body.email}',
//                                   '${hashedPassword}',
//                                   '${req.body.firstname}'
//                                   ,'${req.body.lastname}');`);

//       let user_id = await pool.query(
//         `SELECT user_id FROM public."User" WHERE username = '${username}'`
//       );
//       // Generate a JWT token containing the user's id
//       const token = jwt.sign({ id: user_id.rows[0] }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN,
//       });
//       res
//         .status(201)
//         .json({ message: "User created successfully", user, token });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         error:
//           "An error occurred while creating your account.Please try again.",
//       });
//     }
//   },
//   login: async (req, res) => {
//     // Validate the request body against the log in schema
//     const { error } = logInSchema.validate(req.body, { abortEarly: false });
//     if (error) {
//       return res.status(422).json(error.details);
//     }

//     try {
//       const { username, password } = req.body;

//       // Check if the user exists
//       // Check if the user already exists
//       let checkusername = await pool.query(`SELECT EXISTS (
//                                               SELECT 1
//                                               FROM public."User"
//                                               WHERE username = '${username}'
//                                           );`);

//       if (!checkusername.rows[0].exists) {
//         return res.status(400).json({
//           error: "Invalid username",
//         });
//       }
//       let userData = await pool.query(
//         `SELECT * FROM public."User" WHERE username = '${username}'`
//       );
//       // Check if the password is correct
//       const isValidPassword = await bcrypt.compare(
//         password,
//         userData.rows[0].password
//       );

//       if (!isValidPassword) {
//         return res.status(400).json({
//           error: "Invalid password",
//         });
//       }

//       // Generate a JWT token containing the user's id
//       const token = jwt.sign(
//         { id: userData.rows[0].user_id },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: process.env.JWT_EXPIRES_IN,
//         }
//       );

//       console.log(userData.rows[0]);

//       const image = userData.rows[0].image;

//       res.status(200).json({ message: "Logged in successfully", token, image });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         error: "An error occurred while logging you in. Please try again.",
//       });
//     }
//   },
//   updateImage: async (req, res) => {
//     try {
//       const { image, user_id } = req.body;

//       const user = await pool.query(`SELECT EXISTS (
//                                         SELECT 1
//                                         FROM public."User"
//                                         WHERE user_id = '${user_id}'
//                                     );`);
//       if (!user) {
//         res.status(404).json({ message: "Couldn't find user" });
//       }
//       await pool.query(
//         `UPDATE public."User" SET image = '${image}' WHERE user_id = '${user_id};`
//       );
//       res.status(200).json({ message: "Updated in successfully" });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         error: "An error occurred while logging you in. Please try again.",
//       });
//     }
//   },
//   // This is a protected route that requires the user to be logged in
//   // This controller is used to fetch the data of the logged in user
//   me: (req, res) => {
//     try {
//       res.status(200).json({ user: req.user });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         error: "An error occurred while fetching your data.",
//       });
//     }
//   },
};
export default partController;
