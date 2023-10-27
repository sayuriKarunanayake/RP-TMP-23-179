import React from "react";
import { Grid } from "@mui/material";
import InputFormPage from "./InputFormPage";
import Resume from "./Resume";

function Combined() {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={7}>
          <InputFormPage />
        </Grid>
        <Grid item xs={12} md={5}>
          <Resume />
        </Grid>
      </Grid>
    </>
  );
}

export default Combined;