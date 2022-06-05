import React, { useState } from "react";
import Swipe from "react-easy-swipe";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { Input } from "../containers/Input";
import { DateInput } from "../containers/Date";

import { Layout } from "../components/Layout";
import { ExpensesList } from "../components/ExpensesList";
import Charts from "../components/Charts";

import { ExpensesType, getExpenses } from "../slices/expenses";

import { goToBalance } from "../router";
import { sortByDate } from "../utils";
import { getStatisticts, actions } from "../slices/statistics";

import { Container, D8, D4 } from "../components/MyHTML";
import { DateTime } from "luxon";

const filterExpenses = (expenses: ExpensesType[], pattern: RegExp) =>
  expenses.filter(({ timestamp, expenseName, value, comment }) =>
    [
      DateTime.fromISO(timestamp || '').toFormat("DD MM YYYY HH mm"),
      expenseName,
      value,
      comment,
    ].some((v) => pattern.test(String(v)))
  );

const useStyles = makeStyles(() => ({
  list: {
    padding: 5,
    overflow: "auto",
    height: "calc(100vh - 140px)",
  },
  allTime: {
    marginTop: 10,
  },
}));

const Statictics = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { list: expensesList } = useSelector(getExpenses, shallowEqual);
  const { currentDate } = useSelector(getStatisticts, shallowEqual);
  const [tab, setTab] = useState(0);
  const [filterValue, setFilter] = useState("");

  const onChangeFilter = ({ target: { value } }: any) => setFilter(value);
  const handleChange = (event: any, tabValue: number) => setTab(tabValue);
  const handleDateChange = (date: Date) => dispatch(actions.balanceSetDate(date));
  const allTime = () => dispatch(actions.balanceSetDate(null));

  const pattern = new RegExp(filterValue, "ig");

  const expenses =
    tab === 1
      ? sortByDate(filterExpenses(expensesList, pattern), true)
      : expensesList;

  return (
    <Swipe tolerance={100} onSwipeLeft={() => goToBalance(dispatch)}>
      <Layout title={t("balance")}>
        <AppBar position="static" color="secondary">
          <Tabs
            value={tab}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
          >
            <Tab label={t("orders")} />
            <Tab label={t("expenses")} />
            <Tab label={t("charts")} />
          </Tabs>
        </AppBar>
        <Paper className={classes.list}>
          {tab !== 2 && (
            <Input
              value={filterValue}
              onChange={onChangeFilter}
              placeholder={t("filter")}
            />
          )}
          <Container spacing={4} justifyContent="center">
            <D8>
              <DateInput
                label={t("stat-for-month")}
                className={classes.datepicker}
                value={currentDate}
                onChange={handleDateChange}
              />
            </D8>
            <D4>
              <Button
                className={classes.allTime}
                onClick={allTime}
                color="primary"
              >
                {t("all-time")}
              </Button>
            </D4>
          </Container>
          {tab === 0 && <ExpensesList expenses={sortByDate(expenses, true)} />}
          {tab === 2 && <Charts />}
        </Paper>
      </Layout>
    </Swipe>
  );
};

export default Statictics;
