import React, { FC } from "react";
import cx from "classnames";
import { makeStyles } from "@mui/styles";
import { P } from "./MyHTML";

const useStyles = makeStyles((theme: any) => ({
  negativeValue: {
    "&&": {
      color: theme.palette.error.main,
    },
  },
  label: {
    color: theme.palette.primary.main,
    marginRight: 10,
  },
  labelService: {
    width: 45,
  },
  labelExpense: {
    width: 80,
  },
  labelDate: {
    color: theme.palette.secondary.main,
    width: "100%",
  },
  labelSpan: {
    marginRight: 2,
  },
}));

type TextProps = {
  label: string;
  measure?: string;
  exp?: boolean;
  date?: boolean;
};

export const Text: FC<TextProps> = ({ label, measure, exp, date }) => {
  const classes = useStyles();
  return (
    <P
      variant="subtitle2"
      className={cx(classes.label, {
        [classes.labelDate]: date,
        [classes.labelExpense]: exp,
        [classes.labelService]: !exp,
        [classes.negativeValue]: Number(label) < 0,
      })}
    >
      <span className={classes.labelSpan}>{label}</span>
      <span>{measure}</span>
    </P>
  );
};
