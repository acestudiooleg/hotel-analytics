import React from "react";
import { DateTime } from "luxon";
import Swipe from "react-easy-swipe";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";

import { Layout } from "../components/Layout";
import { BalanceTotal } from "../components/BalanceTotal";
import RedButton from "../components/RedButton";

// import DateInput from "../containers/Date";

// import actions from "../actions/statistics";

// import { getSettings } from "../reducers/settings";
// import { getStatisticts } from "../reducers/statistics";

// import { getBalance } from "../selectors/balance";

import { goToIncomeRoom, goToSpend, goToStatistics, goToSettings } from "../router";

import { Container, D11, D7, D4 } from "../components/MyHTML";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const useStyles = makeStyles(() => ({
  body: {
    height: "calc(100vh - 140px)",
  },

  datepicker: {
    marginTop: 20,
    width: "100%",
  },
  allTime: {
    marginTop: 30,
  },
  buttons: {
    width: "100%",
    position: "absolute",
    bottom: 70,
  },
}));

export const Home = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // const { currency, fuelConsumption, fuelPrice, distanceName, taxiDriver } =
  //   useSelector(getSettings, shallowEqual);

  // const { currentDate } = useSelector(getStatisticts, shallowEqual);
  const currentDate = "2020-01-01";

  // const { earn, balance, expenses, earnToday, distance, orders } =
  //   useSelector(getBalance);

  // const handleDateChange = (date: any) =>
  //   dispatch(actions.balanceSetDate(date));

  // const allTime = () => dispatch(actions.balanceSetDate(null));
  const earn = 1;
  const orders = 1;
  const balance = 1;
  const expenses = 1;
  const earnToday = 1;
  const currency = "USD";

  const dateTitle =
    DateTime.now() == DateTime.fromISO(currentDate)
      ? t("earn-today")
      : DateTime.fromISO(currentDate).toFormat("DD MMMM YYYY");

  const title = t("balance-for", {
    date: DateTime.fromISO(currentDate).toFormat("MMMM"),
  });

  return (
    <Swipe onSwipeLeft={() => 0} onSwipeRight={() => 0} tolerance={100}>
      <Layout title={title}>
        <div className={classes.body}>
          <BalanceTotal
            earn={earn}
            orders={orders}
            dateTitle={dateTitle}
            balance={balance}
            expenses={expenses}
            earnToday={earnToday}
            currency={currency}
          />
          <div className={classes.buttons}>
            <Container spacing={1} justifyContent="center">
              <D11>
                <Button
                  fullWidth
                  onClick={() => goToIncomeRoom(dispatch)}
                  variant="contained"
                  color="primary"
                >
                  {t("earned")}
                </Button>
              </D11>
              <D11>
                <Button
                  fullWidth
                  onClick={() => goToSpend(dispatch)}
                  variant="contained"
                  sx={(theme: any) =>({
                    color: theme.palette.getContrastText(
                      theme.palette.error.main
                    ),
                    backgroundColor: theme.palette.error.main,
                    "&:hover": {
                      backgroundColor: theme.palette.error.main,
                    },
                  })}
                >
                  {t("spent")}
                </Button>
              </D11>
            </Container>
          </div>
        </div>
      </Layout>
    </Swipe>
  );
};
