const router = require("express").Router();
let Job = require("../models/JobPost");

//add route
router.route("/addjob").post((req,res)=>{
    const companyName = req.body.companyName;
    const title = req.body.title;
    const location = req.body.location;
    const jobDescription = req.body.jobDescription;
    const jobLevel = req.body.jobLevel;
    const jobCategory = req.body.jobCategory;
    const recruiterID = req.body.recruiterID;

    //create obj.
    const newJob = new Job({
        companyName,
        title,
        location,
        jobDescription,
        jobLevel,
        jobCategory,
        recruiterID
    })

    newJob.save().then(()=>{
        res.json("New job post added")
    }).catch((err)=>{
        console.log(err);
        res.status(401).send({message:'Error adding job'});
    })
})

//get all jobs to frontend route
router.route("/getalljob").get((req,res)=>{
    Job.find().then((jobs)=>{
        res.json(jobs)
    }).catch((err)=>{
        console.log(err);
    })

})

//get data of one job post
router.route("/getjobpost/:id").get(async(req,res)=>{
    let jobId = req.params.id;
    const job= await  Job.findById(jobId)
    .then((Job) =>{
        res.status(200).send({ status : "Job post fetched", Job})

    }).catch(()=> {
        console.log(err.message);
        res.status(500).send({status: "Error with fetch job post"});
    })
})

//update
router.route("/updatejob/:id").put(async(req,res)=>{
    let jobId = req.params.id;
    const { 
        companyName,
        title,
        location,
        jobDescription,
        jobLevel,
        jobCategory
     } = req.body;

    const updateJob = {
        companyName,
        title,
        location,
        jobDescription,
        jobLevel,
        jobCategory   
    }
    const update = await Job.findByIdAndUpdate(jobId,updateJob)
    .then(()=>{
        res.status(200).send({status:"Job post updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error updating job post", error:err.message});
    })
    
})



//delete
router.route("/deletejob/:id").delete(async(req,res)=>{
    let jobId = req.params.id;
    await Job.findByIdAndDelete(jobId).then(()=>{
        res.status(200).send({status:"Job deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deletion", error:err.message});
    })
})

// Route to get job posts by recruiter ID
// router.route('/getJobsByRecruiter/:recruiterId').get(async (req, res) => {
//     const recruiterId = req.params.recruiterId;
  
//     try {
//       // Find job posts with the specified recruiter ID
//       const jobs = await Job.find({ recruiterId: recruiterId });
  
  
//       res.status(200).json({ success: true, jobs: jobs });
//     } catch (error) {
//       console.error('Error fetching job posts:', error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   });


module.exports = router;