/* eslint-disable no-unused-vars */
import React from "react";

import { withStyles } from "@mui/styles";

import Button from "@mui/material/Button";

export default withStyles((theme: any) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
}))(Button);
