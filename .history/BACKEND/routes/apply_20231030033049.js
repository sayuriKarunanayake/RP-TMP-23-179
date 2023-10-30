const router = require("express").Router();
let Applications = require("../models/Apply");

//add route
router.route("/addApplications").post((req, res) => {
    const fullName = req.body.fullName;
    const phoneNo = req.body.phoneNo;
    const email = req.body.email;
    const videoLink = req.body.videoLink;
    const linkedIn = req.body.linkedIn;
    const jobid = req.body.jobid;


    //create obj.
    const newApplications = new Applications({
        fullName,
        phoneNo,
        email,
        videoLink,
        linkedIn,
        jobid
    })

    newApplications.save().then(() => {
        res.json("New Application saved successfully")
    }).catch((err) => {
        console.log(err);
        res.status(401).send({ message: 'Error saving new application' });
    })
})


//get all 
router.route("/getallapp").get((req, res) => {
    Applications.find().then((application) => {
        res.json(application)
    }).catch((err) => {
        console.log(err);
    })

})

//delete
router.route("/deleteAppl/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await Applications.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "Application deleted" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with deletion", error: err.message });
    })
})


module.exports = router;