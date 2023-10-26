const router = require("express").Router();
const { disconnect } = require("mongoose");
let Result = require("../models/quiz");

//add feedback by driver
 
// Add or update results
router.route("/addresults").post((req, res) => {
  const email = req.body.email;
  const results = req.body.results;
  const recommendations = req.body.recommendations;
  const jobRole = req.body.jobRole;

  Result.findOne({ email: email })
    .then((existingResults) => {
      if (existingResults) {
        // If the record exists, update it
        existingResults.email = email;
        existingResults.results = results;
        existingResults.recommendations = recommendations;
        existingResults.jobRole = jobRole;

        existingResults
          .save()
          .then(() => {
            res.json("Results Updated");
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
          });
      } else {
        // If the record doesn't exist, create a new one
        const newResults = new Result({
          email,
          results,
          recommendations,
          jobRole,
        });

        newResults
          .save()
          .then(() => {
            res.json("Results Added");
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});


router.get("/find/:email", async (req, res) => {
 // const userEmail = req.body.email;
  const userEmail = req.params.email;
  console.log(userEmail,"for find");
  try {
   // let structuredData = await userService.readUser(userEmail);
    const result = await Result.findOne({ email: userEmail });
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

module.exports = router;

// router.route("/addresults").post((req, res) => {
//   const email = req.body.email;
//   const results = req.body.results;
//   const recommendations = req.body.recommendations;
//   const jobRole = req.body.jobRole;

//   Result.findOne({ email: email }).then((savedResults) => {
//     if (savedResults) {
//       // Record found, delete it
//       Result.findOneAndUpdate({ email: email }, (error) => {
//         if (error) {
//           return res.status(500).json({ error: "Internal server error" });
//         } else {
           
//           //store new record
//           const newResults = new Result({
//             //new feedback object

//             email,
//             results,
//             recommendations,
//             jobRole,
//           });

//           newResults
//             .save()
//             .then(() => {
//               //to be executed if successful
//               res.json("result Added");
//             })
//             .catch((err) => {
//               //execute if not successful
//               console.log(err);
//             });
//         } //end delete else
//       });
//     } else {
//       //store new record
//       const newResults = new Result({
//         //new feedback object

//         email,
//         results,
//         recommendations,
//         jobRole,
//       });

//       newResults
//         .save()
//         .then(() => {
//           //to be executed if successful
//           res.json("result Added");
//         })
//         .catch((err) => {
//           //execute if not successful
//           console.log(err);
//         });
//     } //end delete else
//   });
// });

module.exports = router;