import React, { FC } from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { actions } from "../slices/keyboard";

export const DateInput: FC<{
  value: any;
  onChange: (a: any) => void;
  label: string;
  className?: string;
}> = ({ label, value, onChange, className }) => {
  const dispatch = useDispatch();
  const show = () => dispatch(actions.show());
  const hide = () => dispatch(actions.hide());
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      inputFormat="dd/MM/yyyy"
      renderInput={(params) => (
        <TextField
          className={className}
          {...params}
          onFocus={show}
          onBlur={hide}
        />
      )}
    />
  );
};
