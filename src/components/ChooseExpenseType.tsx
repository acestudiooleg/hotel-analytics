import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ExpenseSettingsType } from "../slices/expensesSettings";

const useStyles = makeStyles((theme: any) => ({
  group: {
    margin: theme.spacing(1, 0),
  },
}));

type ChooseExpenseTypeProps = {
  expenses: ExpenseSettingsType[];
  onChange: () => void;
  expenseId: number;
};

export const ChooseExpenseType: FC<ChooseExpenseTypeProps> = ({
  expenses,
  expenseId,
  onChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <FormLabel component="legend">{t("expense")}</FormLabel>
      <RadioGroup
        className={classes.group}
        value={String(expenseId)}
        onChange={onChange}
      >
        {expenses.map((el) => (
          <FormControlLabel
            key={el.name}
            value={String(el.ID)}
            control={<Radio />}
            label={el.name}
          />
        ))}
      </RadioGroup>
    </>
  );
};
