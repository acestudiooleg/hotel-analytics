import React, { FC } from "react";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch } from "react-redux";

import CashIcon from "@mui/icons-material/Money";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import ProfitIcon from "@mui/icons-material/ShowChart";
import DistanceIcon from "@mui/icons-material/Navigation";
import Divider from "@mui/material/Divider";

import { makeGoTo, routes } from "../router";

import { Text } from "./Text";
import { makeDayLine } from "./DateLine";

const useStyles = makeStyles(() => ({
  list: {
    width: "100%",
  },
  li: {
    padding: 4,
    width: "100%",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  listIcon: {
    minWidth: 30,
  },

  param: {
    display: "flex",
    width: 120,
    padding: 10,
  },
}));

type Income = {
  ID?: string;
  serviceName: string;
  distance: string;
  money: string;
  profit: string;
  timestamp: string;
};

type IncomeListProps = {
  incomeList: Income[];
  currency: string;
};

export const IncomeList: FC<IncomeListProps> = ({ incomeList, currency }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const editRide = (id?: string) => () =>
    makeGoTo(`${routes.editRoomIncome}/${id}`)(dispatch);

  return (
    <List
      className={classes.list}
      component="nav"
      aria-label="main mailbox folders"
    >
      {incomeList.map(({ timestamp, serviceName, money, profit, ID }) => {
        return (
          <div key={ID}>
            {makeDayLine(timestamp)}
            <ListItem onDoubleClick={editRide(ID)} className={classes.li}>
              <div className={classes.param}>
                <ListItemIcon className={classes.listIcon}>
                  <CashIcon color="primary" />,
                </ListItemIcon>
                <Text label={serviceName} />
              </div>
              <div className={classes.param}>
                <ListItemIcon className={classes.listIcon}>
                  <DistanceIcon color="secondary" />
                </ListItemIcon>
              </div>
              <div className={classes.param}>
                <ListItemIcon className={classes.listIcon}>
                  <MoneyIcon color="secondary" />
                </ListItemIcon>
                <Text label={money} measure={currency} />
              </div>
              <div className={classes.param}>
                <ListItemIcon className={classes.listIcon}>
                  <ProfitIcon color="secondary" />
                </ListItemIcon>
                <Text label={profit} measure={currency} />
              </div>
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
};
