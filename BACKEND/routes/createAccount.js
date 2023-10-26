const router = require("express").Router();
const { disconnect } = require("mongoose");
let Register = require("../models/createAccount");
let Job = require("../models/JobPost"); //sayuri
//add feedback by driver
router.route("/adduser").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const pwd = req.body.pwd;
  const jobRole = req.body.jobRole;
  const skills = req.body.skills;

  Register.findOne({ email: email }).then((savedRegister) => {
    if (savedRegister) {
      return res
        .status(422)
        .json({ error: "user already exists with that email" });
    }

    const newRegister = new Register({
      //new feedback object

      name,
      email,
      pwd,
      jobRole,
      skills,
    });

    newRegister
      .save()
      .then(() => {
        //to be executed if successful
        res.json("user Added");
      })
      .catch((err) => {
        //execute if not successful
        console.log(err);
      });
  });
});
//view all the data from table by drivers
router.route("/readuser").get((req, res) => {
  Register.find()
    .then((Register) => {
      res.json(Register);
    })
    .catch((err) => {
      console.log(err);
    });
});

//view all the data from table by admin
router.route("/readuadmin").get((req, res) => {
  Register.find()
    .then((Register) => {
      res.json(Register);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update a user
router.route("/update/_id").put(async (req, res) => {
  let userId = req.params.id; //passing id through url as a parameter
  // const { name,email,skills } =req.body; //destructure frontend variables passing to backend through a object

  const name = req.body.name;
  const email = req.body.email;
  const pwd = req.body.pwd;
  const jobRole = req.body.jobRole;
  const skills = req.body.skills;

  const updateRegister = {
    name,
    email,
    pwd,
    jobRole,
    skills,
  };

  await Register.findByIdAndUpdate(userId, updateRegister)
    .then(() => {
      res.status(200).send({ status: "User updated" });
      console.log(updateRegister, "updateRegister");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with update data", error: err.message });
    });
});

// Update a user by id
router.put("/updateuser/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Get the user's id from the URL parameter
    const updatedUserData = req.body; // Data to update

    const updatedUser = await Register.findByIdAndUpdate(
      userId, // Find the user by id
      updatedUserData, // Data to update
      { new: true } // To return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ status: "User updated", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
});

//signin
router.route("/signin").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const pwd = req.body.pwd;
  const jobRole = req.body.jobRole;
  const skills = req.body.skills;

  const newRegister = new Register({
    name,
    email,
    pwd,
    jobRole,
    skills,
  });
  if (!email || !pwd) {
    res.status(422).json({ error: "Please add email or password" });
  }
  Register.findOne({ email: email }).then((savedRegister) => {
    if (!savedRegister) {
      return res
        .status(422)
        .json({ error: "Invalid Email or Password backend error" });
    }

    Register.findOne({ pwd: pwd })
      .then((savedRegister) => {
        if (savedRegister) {
          {
            /* res.json({message:"successfully signed in"}) */
          }

          res.json({ message: "successfully signed in" });
        } else {
          return res.status(422).json({ error: "Invalid Email or Password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

 
//read user by email
router.get("/user/:email", async (req, res) => {
  try {
    const structuredData = [];
    // Get the user email from the request params
    const email = req.params.email;
    console.log("email", email);

    const user = await Register.findOne({ email });
    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      structuredData.push({
        email: user.email,
        jobRole: user.jobRole,
        skills: user.skills,
      });
      // Return the user information
      return res.json(structuredData);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

    //view a specific user by email
    router.route("/getoneuser/:email").get(async(req,res)=> {
    
   
      const email = req.body.email;
  console.log(email,"email")
      const user= await Register.findOne({email:email})
      .then(user =>{
          if(!user){
             return  res.status(422).json({error:"Invalid Email or Password backend error"})
    
          }else{
              res.status(200).json({ status : "user fetched", user})
          }
       
   })
   })

   //newfind user
   router.get("/find/:email", async (req, res) => {
    // const userEmail = req.body.email;
     const userEmail = req.params.email;
     console.log(userEmail,"for  user");
     try {
      // let structuredData = await userService.readUser(userEmail);
       const result = await Register.findOne({ email: userEmail });
       if (result) {
         return res.status(200).send({
           success: true,
           message: "Results fetched successfully",
           data: result,
         });
       }else{
         return res
         .status(500)
         .send({ success: false, error: "Error while loading data" });
       }
     } catch (error) {
       return res
         .status(500)
         .send({ success: false, error: "Error while loading data" });
     }
   });

   //fetch data of one user -working
router.get("/find", async (req, res) => {
  const userEmail = req.body.email;

  try {
   // let structuredData = await userService.readUser(userEmail);
    const user = await Register.findOne({ email: userEmail });
    if (user) {
      return res.status(200).send({
        success: true,
        message: "User fetched successfully",
        data: user,
      });
    }else{
      return res
      .status(500)
      .send({ success: false, error: "Error while loading data" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: "Error while loading data" });
  }
});

   //job posts

   //get all jobs to frontend route
router.route("/getjobs").get((req,res)=>{
  Job.find().then((jobs)=>{
      res.json(jobs)
  }).catch((err)=>{
      console.log(err);
  })

})


module.exports = router;
