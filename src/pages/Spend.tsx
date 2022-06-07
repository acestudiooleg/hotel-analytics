import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useTranslation } from "react-i18next";
import find from "lodash/find";

import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

import { Layout } from "../components/Layout";
import { DateInput } from "../containers/Date";
import { Input } from "../containers/Input";
import { ChooseExpenseType } from "../components/ChooseExpenseType";

import {
  ExpenseSettingsType,
  getExpensesSettings,
} from "../slices/expensesSettings";

import { actions as expensesActions } from "../slices/expenses";

import { Container, D12, D11 } from "../components/MyHTML";

import { routes } from "../router";

const useStyles = makeStyles((theme: any) => ({
  content: {
    position: "relative",
    height: "100%",
    minHeight: 700,
  },
  buttons: {
    marginTop: 15,
    width: "100%",
  },

  radios: {
    display: "flex",
  },
  row: {
    margin: "0 20px",
  },
  input: {
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

export const Spend = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { list: expenses, hasData } = useSelector(
    getExpensesSettings,
    shallowEqual
  );

  const initialState = {
    init: false,
    expenseId: 1,
    timestamp: new Date(),
    value: null,
    comment: null,
  };

  const [state, setState] = useState(initialState);

  if (!state.init && hasData) {
    setState({ ...state, init: true, expenseId: expenses[0].ID || 1 });
  }

  const expense =
    find(expenses, { ID: state.expenseId }) || ({} as ExpenseSettingsType);

  const setData =
    (key: keyof typeof initialState, type: (a: any) => Number | String) =>
    ({ target: { value } }: any) => {
      setState({ ...state, [key]: type(value) });
    };

  const handleDate = (timestamp: Date) => setState({ ...state, timestamp });

  const goto = (url: string) => () => dispatch(push(url));

  const save = () => {
    if (state.value) {
      const { timestamp, value, comment } = state;
      dispatch(
        expensesActions.add({
          timestamp,
          value,
          comment,
          expenseName: expense?.name,
        })
      );
    } else {
      window.alert(t("expense-data-validation-error"));
    }
  };

  return (
    <Layout title={t("spent")}>
      <div className={classes.content}>
        <div className={classes.radios}>
          <FormControl component="fieldset" className={classes.formControl}>
            <ChooseExpenseType
              expenseId={state.expenseId}
              expenses={expenses}
              onChange={() => setData("expenseId", Number)({})}
            />
          </FormControl>
        </div>
        <Container>
          <D12 className={classes.row}>
            <DateInput
              label={t("date")}
              className={classes.datepicker}
              value={state.timestamp}
              onChange={handleDate}
            />
          </D12>
          <D12 className={classes.row}>
            <Input
              label={t("sum")}
              defaultValue={state.value}
              type="number"
              onChange={setData("value", Number)}
            />
          </D12>
          {expense.commentsEnabled && (
            <D12 className={classes.row}>
              <Input
                label={t("comment")}
                defaultValue={state.comment}
                onChange={setData("comment", String)}
              />
            </D12>
          )}
        </Container>
        <div className={classes.buttons}>
          <Container spacing={1} justifyContent="center">
            <D11>
              <Button
                fullWidth
                onClick={save}
                variant="contained"
                color="primary"
              >
                {t("save")}
              </Button>
            </D11>
            <D11>
              <Button
                fullWidth
                onClick={goto(routes.balance)}
                color="secondary"
                variant="contained"
              >
                {t("back")}
              </Button>
            </D11>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default Spend;
