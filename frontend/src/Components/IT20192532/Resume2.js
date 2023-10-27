import React, { useRef } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import jsPDF from "jspdf"

// import images
import infoImage from "../../Assets/IT20192532/info.png"
import ContactImage from "../../Assets/IT20192532/contact.png"
import AboutmeImage from "../../Assets/IT20192532/aboutme.png"
import AchievementsImage from "../../Assets/IT20192532/achievements.png"
import CoursesImage from "../../Assets/IT20192532/courses.png"
import EducationImage from "../../Assets/IT20192532/education.png"
import LanguageImage from "../../Assets/IT20192532/lang.png"
import ProjImage from "../../Assets/IT20192532/proj.png"
import RefImage from "../../Assets/IT20192532/ref.png"
import SkillsImage from "../../Assets/IT20192532/skills.png"
import TechskillsImage from "../../Assets/IT20192532/techSkills.png"
import WorkImage from "../../Assets/IT20192532/work.png"

function Resume() {
  // Get the form data from local storage

  // const formData = {
  //   Abstract_Information: [
  //     {
  //       Image:
  //         "https://tse2.mm.bing.net/th/id/OIP.IzxqO84utJ3tRGURnD24KQHaG4?w=195&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //       Name: "John De Silva",
  //       Role: "Engineer",
  //       Objective:
  //         "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
  //     },
  //   ],
  //   Personal_Information: [
  //     {
  //       Gender: "Male",
  //       Date_of_Birth: "2000-01-11",
  //       Age: "23",
  //       Nationality: "SL",
  //       NIC: "1999",
  //     },
  //   ],
  //   Contact_Information: [
  //     {
  //       Phone: "+947677557890",
  //       Email: "john@gmail.com",
  //       Address: "Colombo",
  //       GitHub: "GIT",
  //       LinkedIn: "LINKEDIN",
  //     },
  //   ],
  //   Education_Information: [
  //     { Institute: "IIT", Qualification: "SE", Year: "2023" },
  //   ],
  //   Work_Experience_Information: [
  //     {
  //       Start_Date: "2021-12-07",
  //       End_Date: "2022-06-30",
  //       Company: "Company ABC",
  //       Job_Description: "Full stack dev",
  //       Job_Title: "Mr",
  //     },
  //   ],
  //   Courses_Followed: [{ Course: "IT", Achieved_Year: "2021" }],
  //   Achievements: [
  //     { Achievements: "Award 1" },
  //     { Achievements: "Award 2" },
  //     { Achievements: "Award 3" },
  //   ],
  //   Projects: [
  //     {
  //       Project_Name: "Project 01",
  //       Project_Description:
  //         "Description 01 Description 01 Description 01 Description 01 Description 01 Description 01 ",
  //       Stacks: "Stack 01",
  //     },
  //     {
  //       Project_Name: "Project 02",
  //       Project_Description:
  //         "Description 02Description 02Description 02Description 02Description 02Description 02",
  //       Stacks: "Stack 02",
  //     },
  //     {
  //       Project_Name: "Project 03",
  //       Project_Description:
  //         "Description 02Description 02Description 02Description 02Description 02Description 02",
  //       Stacks: "Stack 03",
  //     },
  //   ],
  //   Technical_Skills: [
  //     { Technical_Skills: "PHP" },
  //     { Technical_Skills: "Java" },
  //     { Technical_Skills: "Java" },
  //     { Technical_Skills: "Java" },
  //     { Technical_Skills: "Java" },
  //   ],
  //   Skills: [{ Skills: "Time" }, { Skills: "Talk" }],
  //   Languages: [{ Language: "English" }, { Language: "Sinhala" }],
  //   References_Information: [
  //     {
  //       RefName: "Ref 01",
  //       RefEmail: "ref@mail",
  //       RefPhone: "00111111111",
  //       RefDesignation: "ref",
  //     },
  //   ],
  // }

  const formData = JSON.parse(
    localStorage.getItem("resumeData")
      ? localStorage.getItem("resumeData")
      : "{}"
  )
  console.log("formData", formData)

  // Create a reference to the resume div
  const resumeRef = useRef(null)

  // Function to download the resume as PDF
  const handleDownloadPDF = () => {
    let doc = new jsPDF("potrait", "pt")
    doc.html(document.getElementById("resumeCont"), {
      callback: () => {
        doc.save("resume.pdf")
      },
    })
  }

  // Function to return to the home page
  const returnHome = () => {
    window.location.href = "/ResumeForms"
  }

  return (
    <div style={{ backgroundColor: "#EBECF0" }}>
      {/* Button to return Home */}
      <Button
        variant="contained"
        color="primary"
        onClick={returnHome}
        sx={{
          my: 2,
          mx: 1,
          position: "fixed",
          right: "10px",
          bottom: "10px",
        }}
      >
        Home
      </Button>
      {/* Button to download resume */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleDownloadPDF}
        sx={{
          my: 2,
          mx: 12,
          position: "fixed",
          right: "10px",
          bottom: "10px",
        }}
      >
        Download
      </Button>

      <div
        style={{
          display: "block",
          margin: "0 auto",
          padding: "20px 0",
          width: "595px",
        }}
      >
        {/* Content of which the resume is created */}
        <div
          ref={resumeRef}
          id="resumeCont"
          style={{
            display: "block",
          }}
        >
          <Grid container spacing={0} width={595}>
            {/* Left grid of the resume */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                background: "#FFFDFD",
                py: 3,
                px: 3,
              }}
            >
              {Array.isArray(formData.Abstract_Information) &&
                formData.Abstract_Information.map((abstractInfo, index) => (
                  <div key={index}>
                    {/* Profile picture */}
                    <img
                      src={
                        abstractInfo.Image
                          ? abstractInfo.Image
                          : "https://tse2.mm.bing.net/th/id/OIP.IzxqO84utJ3tRGURnD24KQHaG4?w=195&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                      }
                      style={{
                        width: "180px",
                        height: "180px",
                        display: "block",
                        margin: "0 auto",
                        border: "5px solid #E3E2DC",
                      }}
                      alt="profile"
                    />
                    {/* Name */}
                    <Typography
                      variant="h5"
                      color="initial"
                      fontWeight={"bold"}
                      sx={{ textTransform: "capitalize", mt: 2 }}
                    >
                      {abstractInfo.Name ? abstractInfo.Name : ""}
                    </Typography>
                    {/* Role */}
                    <Typography
                      variant="body1"
                      color="initial"
                      fontWeight={"bold"}
                    >
                      {abstractInfo.Role ? abstractInfo.Role : ""}
                    </Typography>
                  </div>
                ))}

              {/* My personal information section */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  ml: -3,
                  pl: 3,
                  backgroundColor: "#355E3B",
                  borderTopRightRadius: "100px",
                  borderBottomRightRadius: "100px",
                }}
              >
                <img src={infoImage} alt="info" height={18} />
                <Typography
                  variant="h6"
                  color="white"
                  fontWeight="bold"
                  sx={{ ml: 1 }}
                >
                  My Information
                </Typography>
              </Box>
              <Stack
                direction={"flex"}
                gap={1}
                sx={{ flexWrap: "wrap", mt: 2 }}
              >
                {/* Populating data to the My personal information section */}
                {Array.isArray(formData.Personal_Information) &&
                  formData.Personal_Information.map((personalInfo, index) => (
                    <div key={index}>
                      <Typography
                        variant="caption"
                        color="initial"
                        fontWeight="bold"
                      >
                        {"Gender: "}
                      </Typography>
                      <Typography variant="caption" color="initial">
                        {personalInfo.Gender ? personalInfo.Gender : "Gender"}{" "}
                      </Typography>
                      <br />
                      <Typography
                        variant="caption"
                        color="initial"
                        fontWeight="bold"
                      >
                        {"DOB: "}{" "}
                      </Typography>
                      <Typography variant="caption" color="initial">
                        {personalInfo.Date_of_Birth
                          ? personalInfo.Date_of_Birth
                          : "Date of Birth"}
                        <br />
                      </Typography>
                      <Typography
                        variant="caption"
                        color="initial"
                        fontWeight="bold"
                      >
                        {"Age: "}{" "}
                      </Typography>
                      <Typography variant="caption" color="initial">
                        {personalInfo.Age ? personalInfo.Age : "Age"}
                        <br />
                      </Typography>
                      <Typography
                        variant="caption"
                        color="initial"
                        fontWeight="bold"
                      >
                        {"Nationality: "}
                      </Typography>
                      <Typography variant="caption" color="initial">
                        {personalInfo.Nationality
                          ? personalInfo.Nationality
                          : "Nationality"}{" "}
                        <br />
                      </Typography>
                      <Typography
                        variant="caption"
                        color="initial"
                        fontWeight="bold"
                      >
                        {"NIC: "}{" "}
                      </Typography>
                      <Typography variant="caption" color="initial">
                        {personalInfo.NIC ? personalInfo.NIC : "NIC"}
                      </Typography>
                    </div>
                  ))}
              </Stack>

              {/* Contact information section */}
              <Box sx={{ my: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    ml: -3,
                    pl: 3,
                    backgroundColor: "#355E3B",
                    borderTopRightRadius: "100px",
                    borderBottomRightRadius: "100px",
                  }}
                >
                  <img src={ContactImage} alt="info" height={25} />
                  <Typography
                    variant="h6"
                    color="white"
                    fontWeight="bold"
                    sx={{ ml: 0.5 }}
                  >
                    Contact
                  </Typography>
                </Box>

                {/* Populating data to the Contact information section */}
                <Box sx={{ my: 2 }}>
                  {Array.isArray(formData.Contact_Information) &&
                    formData.Contact_Information.map((contact, index) => (
                      <div key={index}>
                        {[
                          "Phone",
                          "Email",
                          "Address",
                          "GitHub",
                          "LinkedIn",
                        ].map((field) => (
                          <React.Fragment key={field}>
                            <Typography
                              variant="caption"
                              color="initial"
                              fontWeight="bold"
                            >
                              {field}
                            </Typography>
                            <br />
                            <Typography variant="caption" color="initial">
                              {contact[field] || `Default ${field}`}
                            </Typography>
                            <br />
                          </React.Fragment>
                        ))}
                      </div>
                    ))}
                </Box>
              </Box>

              {/* Skills section */}
              <Box sx={{ mt: 7, mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    ml: -3,
                    pl: 3,
                    backgroundColor: "#355E3B",
                    borderTopRightRadius: "100px",
                    borderBottomRightRadius: "100px",
                  }}
                >
                  <img src={SkillsImage} alt="info" height={35} />
                  <Typography
                    variant="h6"
                    color="white"
                    fontWeight="bold"
                    sx={{ ml: 0.5 }}
                  >
                    Skills
                  </Typography>
                </Box>

                <Box sx={{ my: 2 }}>
                  <Typography variant="body2" color="initial">
                    {/* Populating data to the Skills section */}
                    {Array.isArray(formData.Skills) &&
                      formData.Skills.map((skills, index) => (
                        <Box key={index}>
                          <Typography
                            key={index}
                            variant="body2"
                            color="initial"
                          >
                            {skills.Skills ? skills.Skills.toString() : ""}
                          </Typography>
                        </Box>
                      ))}
                  </Typography>
                </Box>

                {/* Technical Skills section */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    ml: -3,
                    pl: 3,
                    backgroundColor: "#355E3B",
                    borderTopRightRadius: "100px",
                    borderBottomRightRadius: "100px",
                  }}
                >
                  <img src={TechskillsImage} alt="info" height={20} />
                  <Typography
                    variant="h6"
                    color="white"
                    fontWeight="bold"
                    sx={{ ml: 1 }}
                  >
                    Technical Skills
                  </Typography>
                </Box>

                {/* Populating data to the Technical Skills section */}
                <Box sx={{ my: 2 }}>
                  <Typography variant="body2" color="initial">
                    {Array.isArray(formData.Technical_Skills) &&
                      formData.Technical_Skills.map((skills, index) => (
                        <Box key={index}>
                          <Typography variant="body2" color="initial">
                            {skills.Technical_Skills
                              ? skills.Technical_Skills.toString()
                              : ""}
                          </Typography>
                        </Box>
                      ))}
                  </Typography>
                </Box>

                {/* Languages section */}
                <Box sx={{ my: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                      ml: -3,
                      pl: 3,
                      backgroundColor: "#355E3B",
                      borderTopRightRadius: "100px",
                      borderBottomRightRadius: "100px",
                    }}
                  >
                    <img src={LanguageImage} alt="info" height={25} />
                    <Typography
                      variant="h6"
                      color="white"
                      fontWeight="bold"
                      sx={{ ml: 0.5 }}
                    >
                      Languages
                    </Typography>
                  </Box>

                  {/* Populating data to the languages section */}
                  <Box sx={{ my: 2 }}>
                    {Array.isArray(formData.Languages) &&
                      formData.Languages.length > 0 &&
                      formData.Languages.map((Language, index) => (
                        <Box key={index}>
                          <Typography variant="body2" color="initial">
                            {Language.Language
                              ? Language.Language.toString()
                              : "Language"}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right grid of the resume */}
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                background: "#FFFDFD",
                py: 3,
                pr: 3,
                pl: 6,
              }}
            >
              {/* Abstract section */}
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    mr: -3,
                    ml: -2,
                    pl: 2,
                    backgroundColor: "#355E3B",
                    borderTopLeftRadius: "100px",
                    borderBottomLeftRadius: "100px",
                  }}
                >
                  <img src={AboutmeImage} alt="info" height={25} />
                  <Typography
                    variant="h6"
                    color="white"
                    fontWeight="bold"
                    sx={{ ml: 0.5 }}
                  >
                    About Me
                  </Typography>
                </Box>
                {/* Populating data to the Abstract section */}
                {Array.isArray(formData.Abstract_Information) &&
                  formData.Abstract_Information.map((abstractInfo, index) => (
                    <Box key={index} sx={{ my: 2 }}>
                      <Typography variant="body2" color="initial">
                        {abstractInfo.Objective
                          ? abstractInfo.Objective
                          : "My Abstract Objective"}
                      </Typography>
                    </Box>
                  ))}
              </Box>

              {/* Education section */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    mr: -3,
                    ml: -2,
                    pl: 2,
                    backgroundColor: "#355E3B",
                    borderTopLeftRadius: "100px",
                    borderBottomLeftRadius: "100px",
                  }}
                >
                  <img src={EducationImage} alt="info" height={25} />
                  <Typography
                    variant="h6"
                    color="white"
                    fontWeight="bold"
                    sx={{ ml: 0.5 }}
                  >
                    Education
                  </Typography>
                </Box>
                {/* Populating data to the Education section */}
                {Array.isArray(formData.Education_Information) &&
                  formData.Education_Information.map((education, index) => (
                    <Box
                      key={index}
                      sx={{
                        my: 2,
                        pl: 2,
                        borderLeft: "3px solid #000",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: -7,
                          width: "12px", // Width of the dot
                          height: "12px", // Height of the dot
                          borderRadius: "100px", // Make it a circle
                          backgroundColor: "#000", // Dot color
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="initial"
                        fontWeight="bold"
                      >
                        {education.Year || "Year"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="initial"
                        fontWeight="bold"
                      >
                        {education.Qualification || "Qualification"}
                      </Typography>
                      <Typography variant="caption" color="initial">
                        {education.Institute || "Institute"}
                      </Typography>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: -7,
                          width: "12px", // Width of the dot
                          height: "12px", // Height of the dot
                          borderRadius: "100px", // Make it a circle
                          backgroundColor: "#000", // Dot color
                        }}
                      />
                    </Box>
                  ))}
              </Box>

              {/* Work experience section */}
              <Box sx={{ my: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    mr: -3,
                    ml: -2,
                    pl: 2,
                    backgroundColor: "#355E3B",
                    borderTopLeftRadius: "100px",
                    borderBottomLeftRadius: "100px",
                  }}
                >
                  <img src={WorkImage} alt="info" height={20} />
                  <Typography
                    variant="h6"
                    color="white"
                    fontWeight="bold"
                    sx={{ ml: 0.5 }}
                  >
                    Work Experience
                  </Typography>
                </Box>
                {/* Populating data to the Work experience section */}
                {Array.isArray(formData.Work_Experience_Information) &&
                  formData.Work_Experience_Information.map(
                    (workExperience, index) => (
                      <Box
                        key={index}
                        sx={{
                          my: 2,
                          pl: 2,
                          borderLeft: "3px solid #000",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: -7,
                            width: "12px", // Width of the dot
                            height: "12px", // Height of the dot
                            borderRadius: "100px", // Make it a circle
                            backgroundColor: "#000", // Dot color
                          }}
                        />
                        <Typography
                          variant="caption"
                          color="initial"
                          fontWeight="bold"
                        >
                          {workExperience.Start_Date
                            ? workExperience.Start_Date
                            : "Start Date"}{" "}
                          -{" "}
                          {workExperience.End_Date
                            ? workExperience.End_Date
                            : "End Date"}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="initial">
                          {workExperience.Company
                            ? workExperience.Company
                            : "Company Name"}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="initial"
                          fontWeight="bold"
                        >
                          {workExperience.Job_Title
                            ? workExperience.Job_Title
                            : "Job Title"}
                        </Typography>
                        <Typography variant="body2" color="soft">
                          {workExperience.Job_Description
                            ? workExperience.Job_Description
                            : "Job Description"}
                        </Typography>
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: -7,
                            width: "12px", // Width of the dot
                            height: "12px", // Height of the dot
                            borderRadius: "100px", // Make it a circle
                            backgroundColor: "#000", // Dot color
                          }}
                        />
                      </Box>
                    )
                  )}
              </Box>

              {/* Courses followed section */}
              <Box sx={{ my: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    mr: -3,
                    ml: -2,
                    pl: 2,
                    backgroundColor: "#355E3B",
                    borderTopLeftRadius: "100px",
                    borderBottomLeftRadius: "100px",
                  }}
                >
                  <img src={CoursesImage} alt="info" height={30} />
                  <Typography variant="h6" color="white" fontWeight="bold">
                    Courses Followed
                  </Typography>
                </Box>

                {/* Populating data to the Courses section */}
                {Array.isArray(formData.Courses_Followed) &&
                  formData.Courses_Followed.length > 0 &&
                  formData.Courses_Followed.map((course, index) => (
                    <Box key={index} sx={{ my: 2 }}>
                      <Typography variant="body2" color="initial">
                        {course.Course ? course.Course : "Course"} -{" "}
                        {course.Achieved_Year ? course.Achieved_Year : "Year"}
                      </Typography>
                    </Box>
                  ))}
              </Box>

              {/* Projects section */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    mr: -3,
                    ml: -2,
                    pl: 2,
                    backgroundColor: "#355E3B",
                    borderTopLeftRadius: "100px",
                    borderBottomLeftRadius: "100px",
                  }}
                >
                  <img src={ProjImage} alt="info" height={30} />
                  <Typography
                    variant="h6"
                    color="white"
                    fontWeight="bold"
                    sx={{ ml: 1 }}
                  >
                    Projects
                  </Typography>
                </Box>

                {/* Populating data to the Projects section */}
                {Array.isArray(formData.Projects) &&
                  formData.Projects.map((project, index) => (
                    <Box
                      key={index}
                      sx={{
                        my: 2,
                        pl: 2,
                        borderLeft: "3px solid #000",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: -7,
                          width: "12px", // Width of the dot
                          height: "12px", // Height of the dot
                          borderRadius: "100px", // Make it a circle
                          backgroundColor: "#000", // Dot color
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="initial"
                        fontWeight="bold"
                      >
                        {project.Project_Name
                          ? project.Project_Name
                          : "Project Name"}
                      </Typography>
                      <br />
                      <Typography variant="body2" color="initial">
                        {project.Project_Description
                          ? project.Project_Description
                          : "Project Description"}
                      </Typography>
                      <Typography variant="caption" color="soft">
                        {project.Stacks ? project.Stacks : "Stacks"}
                      </Typography>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: -7,
                          width: "12px", // Width of the dot
                          height: "12px", // Height of the dot
                          borderRadius: "100px", // Make it a circle
                          backgroundColor: "#000", // Dot color
                        }}
                      />
                    </Box>
                  ))}
              </Box>

              {/* Achievements section */}
              <Box sx={{ my: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    mr: -3,
                    ml: -2,
                    pl: 2,
                    backgroundColor: "#355E3B",
                    borderTopLeftRadius: "100px",
                    borderBottomLeftRadius: "100px",
                  }}
                >
                  <img src={AchievementsImage} alt="info" height={25} />
                  <Typography
                    variant="h6"
                    color="white"
                    fontWeight="bold"
                    sx={{ ml: 1 }}
                  >
                    Achievements
                  </Typography>
                </Box>
                {/* Populating data to the Achievements section */}
                {Array.isArray(formData.Achievements) &&
                  formData.Achievements.length > 0 &&
                  formData.Achievements.map((achievement, index) => (
                    <Box key={index} sx={{ my: 2 }}>
                      <Typography variant="body2" color="initial">
                        {achievement.Achievements
                          ? achievement.Achievements.toString()
                          : "Achievement"}
                      </Typography>
                    </Box>
                  ))}
              </Box>

              {/* References section */}
              <Box sx={{ my: 3 }}>
                <Box sx={{ my: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                      mr: -3,
                      ml: -2,
                      pl: 2,
                      backgroundColor: "#355E3B",
                      borderTopLeftRadius: "100px",
                      borderBottomLeftRadius: "100px",
                    }}
                  >
                    <img src={RefImage} alt="info" height={25} />
                    <Typography
                      variant="h6"
                      color="white"
                      fontWeight="bold"
                      sx={{ ml: 1 }}
                    >
                      References
                    </Typography>
                  </Box>
                  {/* Populating data to the References section */}
                  {Array.isArray(formData.References_Information) &&
                    formData.References_Information.map((reference, index) => (
                      <Grid container spacing={0} my={2} key={index}>
                        <Grid item xs={12} md={6}>
                          <Typography
                            variant="body1"
                            color="initial"
                            fontWeight={"bold"}
                          >
                            {reference.RefName || "Name"}
                          </Typography>
                          <Typography variant="caption" color="initial">
                            {reference.RefDesignation || "Designation"}
                          </Typography>
                          <Stack direction={"flex"} gap={1}>
                            <Typography
                              variant="caption"
                              color="initial"
                              fontWeight={"bold"}
                            >
                              Phone:
                            </Typography>
                            <Typography variant="caption" color="initial">
                              {reference.RefPhone || "Phone"}
                            </Typography>
                          </Stack>
                          <Stack direction={"flex"} gap={1}>
                            <Typography
                              variant="caption"
                              color="initial"
                              fontWeight={"bold"}
                            >
                              Email:
                            </Typography>
                            <Typography variant="caption" color="initial">
                              {reference.Email || "Email"}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
    // </>
  )
}

export default Resume
