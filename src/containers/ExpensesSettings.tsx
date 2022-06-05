import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import omit from "lodash/omit";
import debounce from "lodash/debounce";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Add from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

import { ExpenseForm } from "../components/ExpenseForm";
import { Container, P, D12, H5 } from "../components/MyHTML";
import { getExpensesSettings, actions, ExpenseSettingsType } from "../slices/expensesSettings";

const useStyles = makeStyles(() => ({
  input: {
    width: "100%",
  },
  fab: {
    margin: 20,
  },
}));

export const ExpensesSettings = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const dispatch = debounce(useDispatch(), 500);

  const { list, hasData } = useSelector(getExpensesSettings, shallowEqual);

  const expenses = list.map((el) => ({ ...el, name: t(el.name) }));

  const [expanded, setExpanded] = useState("");

  const [expensesState, setExpenses] = useState(expenses);

  const showAddButton = expensesState.every(
    (el) => el.name !== expanded && !el.isNew
  );

  if (hasData && !expensesState.length) {
    setExpenses(expenses);
  }

  const handleService = (name: string) => (data: ExpenseSettingsType) => {
    const newExpenses = expensesState.map((el) => {
      if (el.name === name) {
        return data;
      }
      return el;
    });
    setExpenses(newExpenses);
  };

  const handleAccordionChange =
    (panel: string) => (event: any, isExpanded: boolean) =>
      setExpanded(isExpanded ? panel : "");

  const addExpenses = () => {
    const newServices = [
      ...expensesState,
      {
        isNew: true,
        name: t("new-expense-name"),
        newName: "",
        commentsEnabled: false,
      },
    ];
    setExpenses(newServices);
    setExpanded(`${t("new-expense-name")}New`);
  };

  const saveNewExpenses = () => {
    const newExpense = expensesState.find((el) => el.isNew);
    if (newExpense) {
      if (!newExpense.newName) {
        return window.alert(t("expense-name-validation-error"));
      }
      newExpense.name = newExpense.newName;
      dispatch(actions.add(omit(newExpense, ["isNew", "newName"])));
    }
    return setExpanded("");
  };

  const removeExpenses =
    ({ name, ID }: ExpenseSettingsType) =>
    () => {
      const isDelete = window.confirm(
        t("remove-expense-confirmation", { name })
      );
      if (isDelete) {
        alert(t("remove-expense-success", { name }));
        setExpenses(expensesState.filter((el) => el.ID !== ID));
        if (ID) {
          dispatch(actions.remove({ ID }));
        }
      }
    };

  return (
    <>
      <D12>
        <H5 align="center">{t("expenses-title")}</H5>
        <P align="center">{t("expenses-desc")}</P>
      </D12>
      <D12>
        {expensesState.map((el) => (
          <Accordion
            key={el.name + (el.ID || "New")}
            expanded={expanded === el.name + (el.ID || "New")}
            onChange={handleAccordionChange(el.name + (el.ID || "New"))}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <P className={classes.heading}>{el.name}</P>
            </AccordionSummary>
            <AccordionDetails>
              <ExpenseForm
                expense={el}
                onChange={handleService(el.name)}
                onRemove={removeExpenses(el)}
                onSave={saveNewExpenses}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </D12>
      {showAddButton && (
        <Container justifyContent="flex-end">
          <Fab onClick={addExpenses} className={classes.fab} color="primary">
            <Add />
          </Fab>
        </Container>
      )}
    </>
  );
};

