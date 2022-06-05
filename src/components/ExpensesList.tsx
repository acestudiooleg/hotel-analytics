import React, { FC } from "react";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import MoneyIcon from "@mui/icons-material/AttachMoney";
import ExpensesIcon from "@mui/icons-material/ShoppingCart";
import CommentsIcon from "@mui/icons-material/Create";
import Divider from "@mui/material/Divider";

import { makeDayLine } from "./DateLine";
import { Text } from "./Text";

const useStyles = makeStyles(() => ({
  listIcon: {
    minWidth: 30,
  },
  list: {
    width: "100%",
  },
  li: {
    padding: 4,
    width: "100%",
    flexWrap: "wrap",
  },

  param: {
    display: "flex",
    width: 120,
    padding: 10,
  },
}));

type ExpenseType = {
  expenseName: string;
  value: string;
  timestamp: string;
  comment: string;
};

type ExpensesListProps = {
  expenses: ExpenseType[];
};

export const ExpensesList: FC<ExpensesListProps> = ({ expenses }) => {
  const classes = useStyles();
  return (
    <List component="nav" aria-label="main mailbox folders">
      {expenses.map(({ timestamp, expenseName, value, comment }) => (
        <div key={timestamp + value}>
          {makeDayLine(timestamp)}
          <ListItem className={classes.li}>
            <div className={classes.param}>
              <ListItemIcon className={classes.listIcon}>
                <ExpensesIcon color="secondary" />
              </ListItemIcon>
              <Text exp label={expenseName} />
            </div>
            <div className={classes.param}>
              <ListItemIcon className={classes.listIcon}>
                <MoneyIcon color="secondary" />
              </ListItemIcon>
              <Text exp label={value} measure={'123'} />
            </div>
            <div className={classes.param}>
              <ListItemIcon className={classes.listIcon}>
                <CommentsIcon color="secondary" />
              </ListItemIcon>
              <Text exp label={comment} />
            </div>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};
