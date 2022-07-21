const jwt = require("jsonwebtoken");
const bcrypt =require("bcrypt");
const usermodel =  require('../models/user.model');
// exports.registration =  (req, res) =>{
//     const user =  new usermodel(req.body);
//     user.save().then(() =>{
//         res.status(200).json({
//             status:"Success",
//             data: user
//         });
//     }).catch((e) =>{
//         res.status(400);
//         res.send(e);
//     })
// }

// exports.registration = async (req, res, next) => {
//     const user =  new usermodel(req.body)

    
//     try {
//       await user.save();
//     } catch {
//       const error = new Error("Error! Something went wrong.");
//       return next(error);
//     }
//     let token;
//     try {
//       token = jwt.sign(
//         { userId: user.id, email: user.email },
//         "process.env.TOKEN_SECRET",
//         { expiresIn: "1h" }
//       );
//     } catch (err) {
//       const error = new Error("Error! Something went wrong.");
//       return next(error);
//     }
//     res
//       .status(201)
//       .json({
//         success: true,
//         data: { userId: user.id, 
//             email: user.email, token: token },
//       });
//   };


  exports.registration = async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      if (req.body.password !== req.body.cnpassword) {
        return res.status(200).send("Password Not match");
      }
      
      delete req.body["cnpassword"]
      encryptedPassword = await bcrypt.hash(req.body.password, 10);
      const user =  new usermodel(req.body);
      console.log(encryptedPassword);
      
    //   const oldUser = await usermodel.findByEmail(req.body.email);
  
    //   if (oldUser) {
    //     return res.status(409).send("User Already Exist. Please Login");
    //   }
  
    //   console.log("datalog", oldUser)
      //Encrypt user password
     
  
      // Create user in our database
      user.save().then(() =>{

        const token = jwt.sign(
            { user_id: user._id },
            "secretkeyappearshere",
            {
              expiresIn: "2h",
            }
          );
          // save user token
          user.token = token;
      
          // return new user
         // res.status(201).json(user);
        res.status(201).json({
            status:"Success",
            data: user
        });
    }).catch((e) =>{
        res.status(400).json({
            status:"Failed",
            error: e
        });
    })
  
      // Create token
     
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  };

exports.login = async (req, res, next) => {
    let { email, password } = req.body;
    
    let existingUser;
    try {
      existingUser = await usermodel.findOne({ email: email });
    } catch {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    if (!existingUser || existingUser.password != password) {
      const error = Error("Wrong details please check at once");
      return next(error);
    }
    let token;
    try {
      //Creating jwt token
      token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        "secretkeyappearshere",
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    
    res
      .status(200)
      .json({
        success: true,
        data: {
          userId: existingUser.id,
          email: existingUser.email,
          token: token,
        },
      });
  };