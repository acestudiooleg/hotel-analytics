import FormControl, { FormControlProps } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { FC } from "react";

export type Option = {
  value: string | number;
  label: string;
};

type SelectboxProps = {
  label?: string;
  value: string | number;
  onChange?: (event: SelectChangeEvent<string | number>) => void;
  onSelect?: (value: Option) => void;
  options: Option[];
  className?: string;
  formProps?: FormControlProps;
  selectProps?: SelectProps;
};

export const Selectbox: FC<SelectboxProps> = ({
  label,
  value,
  onChange,
  onSelect,
  options,
  className,
  selectProps,
  formProps,
}) => {
  const id = label || `selectbox-${Math.random()}`;
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    const option = options.find((o) => o.value === event.target.value);
    if (option) {
      onSelect && onSelect(option);
    }
    onChange && onChange(event);
  };
  return (
    <FormControl {...formProps} className={className}>
      {label && <InputLabel id={id}>{label}</InputLabel>}
      <Select
        labelId={id}
        id={`${id}-select`}
        value={value}
        label={label}
        onChange={handleChange as any}
        {...(selectProps || {})}
      >
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
