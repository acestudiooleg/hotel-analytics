import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, withStyles } from "@mui/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Delete from "@mui/icons-material/Delete";
import Save from "@mui/icons-material/Save";
import Fab from "@mui/material/Fab";
import { Input } from "../containers/Input";

import { Container, D12, D6 } from "../components/MyHTML";
import { ExpenseSettingsType } from "../slices/expensesSettings";

type ExpenseFormProps = {
  expense: ExpenseSettingsType;
  onChange: (state: ExpenseSettingsType) => void;
  onRemove: () => void;
  onSave: () => void;
};

const useStyles = makeStyles((theme: any) => ({
  input: {
    width: "100%",
  },
  removeButton: {
    backgroundColor: theme.palette.red,
  },
}));

const RemoveButton = withStyles((theme: any) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))(Fab);

export const ExpenseForm: FC<ExpenseFormProps> = ({
  expense,
  onChange,
  onRemove,
  onSave,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleInputChange =
    (name: string) =>
    ({ target: { value } }: any) => {
      const newState = { ...expense, [name]: value };
      onChange(newState);
    };

  const handleCheckboxChange =
    (name: keyof ExpenseSettingsType) => (a: any, enabled: boolean) => {
      const newState = { ...expense, [name]: enabled };
      onChange(newState);
    };
  return (
    <Container>
      {expense.isNew && (
        <D12>
          <Input
            label={t("expense-name")}
            defaultValue={expense.newName}
            className={classes.input}
            onChange={handleInputChange("newName")}
            margin="normal"
            variant="outlined"
          />
        </D12>
      )}
      <D12>
        <FormControlLabel
          control={
            <Switch
              checked={expense.commentsEnabled}
              onChange={handleCheckboxChange("commentsEnabled")}
              defaultValue={Number(expense.commentsEnabled)}
            />
          }
          label={t("add-comments-input")}
        />
      </D12>
      {!expense.isNew && (
        <D12>
          <Container justifyContent="flex-end">
            <RemoveButton onClick={onRemove}>
              <Delete />
            </RemoveButton>
          </Container>
        </D12>
      )}
      {expense.isNew && (
        <D12>
          <Container justifyContent="flex-end">
            <D6>
              <RemoveButton onClick={onRemove}>
                <Delete />
              </RemoveButton>
            </D6>
            <D6>
              <Container justifyContent="flex-end">
                <Fab color="secondary" onClick={onSave}>
                  <Save />
                </Fab>
              </Container>
            </D6>
          </Container>
        </D12>
      )}
    </Container>
  );
};
