import React, { FC } from "react";
import { useDispatch } from "react-redux";

import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { actions } from "../slices/keyboard";

export const Input: FC<TextFieldProps & { end?: boolean; start?: boolean }> = ({
  end,
  start,
  ...props
}) => {
  const dispatch = useDispatch();
  const show = () => dispatch(actions.show());
  const hide = () => dispatch(actions.hide());
  return (
    <TextField
      style={{ width: "100%" }}
      margin="normal"
      variant="outlined"
      onFocus={show}
      onBlur={hide}
      InputProps={{
        endAdornment: end && (
          <InputAdornment position="end">{end}</InputAdornment>
        ),
        startAdornment: start && (
          <InputAdornment position="start">{start}</InputAdornment>
        ),
      }}
      {...props}
    />
  );
};