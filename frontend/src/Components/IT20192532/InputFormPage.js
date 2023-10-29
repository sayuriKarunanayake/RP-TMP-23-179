import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./InputFormPage.css"
import { Box } from "@mui/system"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material"
import temp01 from "../../Assets/IT20192532/resume.png"
import temp02 from "../../Assets/IT20192532/resume2.png"

// Define the steps and fields for each step for the text fields inputs
const steps = [
  {
    label: "Template - Select a template to build your resume",
    fields: ["Templates"],
  },
  {
    label: "Step 1 - Abstract Information",
    fields: ["Image", "Name", "Role", "Objective"],
  },
  {
    label: "Step 2 - Personal Information",
    fields: ["Gender", "Date_of_Birth", "Age", "Nationality", "NIC"],
  },
  {
    label: "Step 3 - Contact Information",
    fields: ["Phone", "Email", "Address", "GitHub", "LinkedIn"],
  },
  {
    label: "Step 4 - Education Information",
    fields: ["Institute", "Qualification", "Year"],
  },
  {
    label: "Step 5 - Work Experience Information",
    fields: [
      "Start_Date",
      "End_Date",
      "Company",
      "Job_Description",
      "Job_Level",
    ],
  },
  {
    label: "Step 6 - Courses Followed",
    fields: ["Course", "Achieved_Year"],
  },
  {
    label: "Step 7 - Achievements",
    fields: ["Achievements"],
  },
  {
    label: "Step 8 - Projects",
    fields: ["Project_Name", "Project_Description", "Stacks"],
  },
  {
    label: "Step 9 - Technical Skills",
    fields: ["Technical_Skills"],
  },
  {
    label: "Step 10 - Skills",
    fields: ["Skills"],
  },
  {
    label: "Step 11 - Languages",
    fields: ["Language"],
  },
  {
    label: "Step 12 - References Information",
    fields: ["RefName", "RefEmail", "RefPhone", "RefDesignation"],
  },
]

function DynamicSection({
  formData,
  setFormData,
  sectionKey,
  fields,
  index,
  handleRemoveSection,
}) {
  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${sectionKey}${index}_${field}`]: value,
    }))
  }

  // Define the dropdown options for the dynamic sections
  const dropdownOptions = {
    Language: ["English", "Sinhala", "Tamil", "French", "Spanish"],
  }

  return (
    <div key={index}>
      <Typography variant="h6">
        {sectionKey.split("-")[1]} {index + 2}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
        }}
      >
        {fields.map((field) => (
          <React.Fragment key={field}>
            {field in dropdownOptions ? (
              <FormControl variant="outlined" fullWidth>
                <InputLabel>{field}</InputLabel>
                <Select
                  value={formData[`${sectionKey}${index}_${field}`] || ""}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                  label={field}
                >
                  {dropdownOptions[field].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                label={field}
                variant="outlined"
                value={formData[`${sectionKey}${index}_${field}`] || ""}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                type={field.includes("Date") ? "date" : "text"}
                InputLabelProps={
                  field.includes("Date") ? { shrink: true } : undefined
                }
                fullWidth
              />
            )}
          </React.Fragment>
        ))}
      </Box>
      <Button
        variant="outlined"
        onClick={() => handleRemoveSection(sectionKey, index)}
        sx={{ mt: 1, float: "right", color: "red" }}
      >
        Remove {sectionKey.split("-")[1]}
      </Button>
    </div>
  )
}

// Main function for the input form page
function InputFormPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const [dynamicSections, setDynamicSections] = useState({})
  const history = useNavigate() // Access the history object for navigation

  const handleFinish = () => {
    // Include data from dynamically added sections

    // Consolidate the data for the template selection
    console.log("selectedTemplate -> ", selectedTemplate)
    const consolidatedData = steps.map((step) => {
      const sectionData = []
      if (step.fields) {
        sectionData.push(
          step.fields.reduce((sectionFieldData, field) => {
            sectionFieldData[field] = formData[field]
            return sectionFieldData
          }, {})
        )
      }

      // Add the data from the dynamic sections
      if (dynamicSections[step.label]) {
        for (let idx = 0; idx < dynamicSections[step.label]; idx++) {
          const sectionFieldData = {}
          step.fields.forEach((field) => {
            sectionFieldData[field] = formData[`${step.label}${idx}_${field}`]
          })
          sectionData.push(sectionFieldData)
        }
      }

      // Create a key for the section based on the label
      const splitLabel = step.label.split("-")[1].trim() // Split by "-" and get the second part, then remove leading/trailing spaces
      const modifiedLabel = splitLabel.replace(/\s+/g, "_") // Replace spaces with underscores
      return { [modifiedLabel]: sectionData }
    })

    // Consolidate the data into a single object
    const consolidatedFormData = Object.assign({}, ...consolidatedData)

    // Store the data in local storage and navigate to the resume page
    localStorage.setItem("resumeData", JSON.stringify(consolidatedFormData))

    // Navigate to the resume page
    if (selectedTemplate === "Temp_01") {
      history("/resume")
    } else if (selectedTemplate === "Temp_02") {
      history("/resume2")
    }
  }
  const handleNext = () => {
    // Define required fields here from the STEPS
    const requiredFields = {
      0: [],
      1: ["Image", "Name", "Role", "Objective"],
      2: ["Gender", "Date_of_Birth", "Age", "Nationality", "NIC"],
      3: ["Phone", "Email"],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
    }

    const stepFields = requiredFields[activeStep]

    if (!stepFields) {
      // Handle the case where required fields are not defined for the current step
      console.error(`Required fields not defined for step ${activeStep}.`)
      return
    }

    const missingRequiredFields = stepFields.filter((field) => !formData[field])

    // Check if the user has selected a template
    if (selectedTemplate === "") {
      alert("Please select a template to build your resume")
      return
    }

    // Check if all required fields are filled
    if (missingRequiredFields.length > 0) {
      const missingFieldNames = missingRequiredFields.join("\n - ")
      alert(`Please fill out these fields:\n - ${missingFieldNames}`)
      return
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    setFormData({})
    setDynamicSections({})
    localStorage.removeItem("resumeData")
  }

  const handleAddSection = (sectionKey) => {
    setDynamicSections((prevSections) => ({
      ...prevSections,
      [sectionKey]: (prevSections[sectionKey] || 0) + 1, // Increment the section count
    }))
  }

  const handleRemoveSection = (sectionKey, index) => {
    const updatedSections = { ...dynamicSections }
    if (updatedSections[sectionKey] > 0) {
      updatedSections[sectionKey]--
    }
    setDynamicSections(updatedSections)
  }

  const handleFieldChange = (field, value) => {
    // Update the form data
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  // Handle image changes for profile image
  const handleImageChange = (field, event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const value = reader.result // The base64 encoded image data
        setFormData((prevData) => ({
          ...prevData,
          [field]: value,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Define the dropdown options
  const dropdownOptions = {
    Role: [
      "Database Administrator",
      "Network Engineer",
      "Systems Administrator",
      "Project Manager",
      "DevOps Engineer",
      "Business Analyst",
      "Software Developer/Engineer",
    ],
    Job_Title: ["Intern", "Associate", "Trainee", "Mid Level", "Senior"],
    Gender: ["Male", "Female"],
    Nationality: ["Sri Lankan", "Other"],
    Language: ["English", "Sinhala", "Tamil", "French", "Spanish"],
  }

  const buttonStyle = {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",

    hoover: "0.5s",
    width: "175px",
  }
  return (
    <>
      <div style={{ margin: "2% 5%", color: "#1976d2" }}>
        <h1 style={{ textAlign: "center" }}>Build Your Own Resume</h1>
        <Button style={buttonStyle} as={Link} to="/ResumeHome">
          Back
        </Button>
        <br></br> <br></br>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    padding: 4,
                  }}
                >
                  {step.fields.map((field) => (
                    <React.Fragment key={field}>
                      {field === "Templates" ? (
                        <div>
                          <FormControl component="fieldset">
                            <Typography
                              variant="body1"
                              color="initial"
                              fontWeight="bold"
                              sx={{ marginTop: 5, marginBottom: 5 }}
                            >
                              {"Select a template to build your resume"}
                            </Typography>

                            <RadioGroup
                              aria-label="template"
                              name="template"
                              value={selectedTemplate}
                              onChange={(e) =>
                                setSelectedTemplate(e.target.value)
                              }
                              style={{ flexDirection: "row" }}
                            >
                              <FormControlLabel
                                value="Temp_01"
                                control={<Radio />}
                                label={
                                  <div
                                    style={{
                                      flexDirection: "column",
                                      textAlign: "center",
                                    }}
                                  >
                                    <img
                                      src={temp01}
                                      alt="Template 1"
                                      style={{
                                        width: "210px",
                                        height: "200px",
                                        marginRight: "10px",
                                      }}
                                    />
                                    <Typography>{"Template 1"}</Typography>
                                  </div>
                                }
                              />
                              <FormControlLabel
                                value="Temp_02"
                                control={<Radio />}
                                label={
                                  <div
                                    style={{
                                      flexDirection: "column",
                                      textAlign: "center",
                                    }}
                                  >
                                    <img
                                      src={temp02}
                                      alt="Template 2"
                                      style={{
                                        width: "170px",
                                        height: "200px",
                                        marginRight: "10px",
                                      }}
                                    />
                                    <Typography>{"Template 2"}</Typography>
                                  </div>
                                }
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      ) : field !== "Image" ? (
                        field in dropdownOptions ? (
                          <FormControl variant="outlined" fullWidth>
                            <InputLabel>{field}</InputLabel>
                            <Select
                              value={formData[field] || ""}
                              onChange={(e) =>
                                handleFieldChange(field, e.target.value)
                              }
                              label={field}
                            >
                              {dropdownOptions[field].map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ) : (
                          <TextField
                            label={field}
                            variant="outlined"
                            value={formData[field] || ""}
                            onChange={(e) =>
                              handleFieldChange(field, e.target.value)
                            }
                            type={field.includes("Date") ? "date" : "text"}
                            InputLabelProps={
                              field.includes("Date")
                                ? { shrink: true }
                                : undefined
                            }
                          />
                        )
                      ) : (
                        <TextField
                          label={field}
                          variant="outlined"
                          onChange={(e) => handleImageChange(field, e)}
                          type="file"
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    </React.Fragment>
                  ))}

                  {step.label !== "Step 1 - Abstract Information" &&
                    step.label !== "Step 2 - Personal Information" &&
                    step.label !== "Step 3 - Contact Information" &&
                    step.label !==
                      "Template - Select a template to build your resume" && (
                      // Add dynamic sections for the form
                      <>
                        {Array.from(
                          { length: dynamicSections[step.label] || 0 },
                          (_, idx) => (
                            <DynamicSection
                              key={idx}
                              formData={formData}
                              setFormData={setFormData}
                              sectionKey={step.label}
                              fields={step.fields}
                              index={idx}
                              handleRemoveSection={handleRemoveSection}
                              handleAddSection={() =>
                                handleAddSection(step.label)
                              }
                            />
                          )
                        )}
                        {/* Add button to add a similar section */}
                        <Button
                          variant="outlined"
                          onClick={() => handleAddSection(step.label)}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Add {step.label.split("-")[1]}
                        </Button>
                      </>
                    )}
                </Box>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      onClick={handleNext}
                      sx={{
                        mt: 1,
                        mr: 1,
                        background:
                          index === steps.length - 1 ? "green" : "#44b8d5",
                        color: "white",
                        "&:hover": {
                          background:
                            index === steps.length - 1 ? "green" : "blue",
                        },
                      }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{
                        mt: 1,
                        mr: 1,
                        background:
                          index === steps.length - 1 ? "blue" : "#44b8d5",
                        color: "white",
                        "&:hover": {
                          background:
                            index === steps.length - 1 ? "blue" : "blue",
                        },
                      }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>
            <strong>
              <center>
                <h2 className="resumeinputpa">
                  Well done !!! All steps completed
                </h2>
              </center>
            </strong>
          </Typography>
          <br></br>
          {/* Add radio buttons for selecting a template */}

          <center>
            <Button
              onClick={handleReset}
              variant="contained" // You can choose a variant (outlined, contained, etc.)
              color="primary" // Choose a color (primary, secondary, etc.)
              size="large" // Choose a size (small, medium, large)
            >
              Make a new Resume
            </Button>
          </center>
          <br></br>

          {/* Send the form data to the resume */}
          <center>
            <Button
              onClick={handleFinish}
              variant="contained" // You can choose a variant (outlined, contained, etc.)
              color="primary" // Choose a color (primary, secondary, etc.)
            >
              Finish and View Summary
            </Button>
          </center>
        </Paper>
      )}
    </>
  )
}

export default InputFormPage
