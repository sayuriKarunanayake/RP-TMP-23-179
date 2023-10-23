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

    //create obj.
    const newJob = new Job({
        companyName,
        title,
        location,
        jobDescription,
        jobLevel,
        jobCategory
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







module.exports = router;