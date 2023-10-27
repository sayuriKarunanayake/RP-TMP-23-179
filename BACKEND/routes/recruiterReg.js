const router = require("express").Router();
let Recruiter = require("../models/RecruiterReg");

//add route
router.route("/addRecruiter").post((req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const company_name = req.body.company_name;
    const currentJob = req.body.currentJob;
    const contactNo = req.body.contactNo;
    const workMail = req.body.workMail;
    const pwd = req.body.pwd;
    

    //create obj.
    const newRecruiter = new Recruiter({
        firstName,
        lastName,
        company_name,
        currentJob,
        contactNo,
        workMail,
        pwd
    })

    newRecruiter.save().then(()=>{
        res.json("New recruiter saved successfully")
    }).catch((err)=>{
        console.log(err);
        res.status(401).send({message:'Error saving new recuiter'});
    })
})


//get all 
router.route("/getallrec").get((req,res)=>{
    Recruiter.find().then((jobs)=>{
        res.json(jobs)
    }).catch((err)=>{
        console.log(err);
    })

})

//get data of one by id 
router.route("/getRecuiter/:id").get(async(req,res)=>{
    let recruiterId = req.params.id;
    const recruiter= await  Recruiter.findById(recruiterId)
    .then((Recruiter) =>{
        res.status(200).send({ status : "Recruiter details fetched", Recruiter})

    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error fetching recruiter details"});
    })
})

//update
router.route("/updateRecuiter/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const { 
        firstName,
        lastName,
        company_name,
        currentJob,
        contactNo,
        workMail,
        pwd
     } = req.body;

    const updateRecuiter = {
        firstName,
        lastName,
        company_name,
        currentJob,
        contactNo,
        workMail,
        pwd 
    }
    const update = await Recruiter.findByIdAndUpdate(userId,updateRecuiter)
    .then(()=>{
        res.status(200).send({status:"User updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error updating user", error:err.message});
    })
    
})


//delete
router.route("/deleteRecuiter/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await Recruiter.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deletion", error:err.message});
    })
})

// Login route
router.route('/login').post(async (req, res) => {
    const email = req.body.workMail;
    const pwd = req.body.pwd;
  
    try {
      // Find the user in the database
      const user = await Recruiter.findOne({ workMail: email, pwd:pwd });
  
      if (user) {
        // Authentication successful
        res.json({ success: true, message: 'Login successful', userId: user._id });
      } else {
        // Authentication failed
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      // Handle other errors
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  


module.exports = router;