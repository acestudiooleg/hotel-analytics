import Checkbox from "@mui/material/Checkbox";
import FormControl, { FormControlProps } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { FC, useState } from "react";

export type Option = {
  value: string | number;
  label: string;
};

type MultiSelectboxProps = {
  placeholder?: string;
  label?: string;
  value: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
  onSelect?: (value: Option[]) => void;
  options: Option[];
  className?: string;
  formProps?: FormControlProps;
  selectProps?: SelectProps<string>;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const MultiSelectbox: FC<MultiSelectboxProps> = ({
  label,
  value,
  placeholder,
  onChange,
  onSelect,
  options,
  className,
  selectProps,
  formProps,
}) => {
  const id = label || `selectbox-${Math.random()}`;
  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    const vals = typeof value === "string" ? value.split(", ") : value;
    const selectedOpts = options.filter((o) =>
      vals.includes(o.label.toString())
    );
    onSelect && onSelect(selectedOpts);
    onChange && onChange(event);
  };
  return (
    <FormControl {...formProps} className={className}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={`${id}-select`}
        multiple
        value={value.split(", ") as any}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => {
          if ((selected as any).filter(Boolean).length === 0) {
            return <em>{placeholder || "Select"}</em>;
          }
          return (selected as any).join(", ");
        }}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
        {...(selectProps || {})}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.label}>
            <Checkbox checked={value.split(", ").indexOf(opt.label) > -1} />
            <ListItemText primary={opt.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
