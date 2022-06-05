import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import omit from "lodash/omit";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Add from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import debounce from "lodash/debounce";

import { ProviderSettingsForm } from "../components/ProviderSettingsForm";
import { Container, P, H5, D12 } from "../components/MyHTML";
import { actions, getProviders, Provider } from "../slices/providers";

const useStyles = makeStyles(() => ({
  input: {
    width: "100%",
  },
  fab: {
    margin: 20,
  },
}));

export const Providers = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { list: providers, hasData } = useSelector(getProviders, shallowEqual);

  const [expanded, setExpanded] = useState("");

  const [providersState, setServices] = useState(providers);

  if (hasData && !providersState.length) {
    setServices(providers);
  }

  const maybeNew = providersState.find((el) => el.isNew);

  if (maybeNew) {
    const alreadySaved = providers.find((el) => el.name === maybeNew.name);
    if (alreadySaved) {
      setServices(providers);
    }
  }

  const showAddButton = providersState.every(
    (el) => el.name !== expanded && !el.isNew
  );

  const dispatch = debounce(useDispatch(), 500);

  const handleService =
    (providerName: Provider["name"]) => (provider: Provider) => {
      const newServices = providersState.map((el) => {
        if (el.name === providerName) {
          return provider;
        }
        return el;
      });

      setServices(newServices);
    };

  const handleAccordionChange =
    (panel: string) => (event: any, isExpanded: boolean) =>
      setExpanded(isExpanded ? panel : "");

  const addService = () => {
    const newServices = [
      ...providersState,
      {
        isNew: true,
        name: t("new-service-name"),
        newName: "",
        fee: 0,
      },
    ];
    setServices(newServices);
    setExpanded(`${t("new-service-name")}New`);
  };

  const saveService = () => {
    const newService = providersState.find((el) => el.isNew);

    if (newService) {
      if (!newService.newName) {
        return window.alert(t("service-name-validation-error"));
      }
      newService.name = newService.newName;
      dispatch(actions.add(omit(newService, ["isNew", "newName"])));
    }
    return setExpanded("");
  };

  const removeService =
    ({ name, ID }: Provider) =>
    () => {
      const isDelete = window.confirm(
        t("remove-service-confirmation", { name })
      );
      if (isDelete) {
        alert(t("remove-service-success", { name }));
        setServices(providersState.filter((el) => el.name !== name));
        if (ID) {
          dispatch(actions.remove({ ID }));
        }
      }
    };

  return (
    <>
      <D12>
        <H5 align="center">{t("taxi-services-title")}</H5>
        <P align="center">{t("taxi-services-desc")}</P>
      </D12>
      <D12>
        {providersState.map((el) => (
          <Accordion
            key={el.name + (el.ID || "New")}
            expanded={expanded === el.name + (el.ID || "New")}
            onChange={handleAccordionChange(el.name + (el.ID || "New"))}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <P className={classes.heading}>{el.name}</P>
            </AccordionSummary>
            <AccordionDetails>
              <ProviderSettingsForm
                provider={el}
                onChange={handleService(el.name)}
                onRemove={removeService(el)}
                onSave={saveService}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </D12>
      {showAddButton && (
        <Container justifyContent="flex-end">
          <Fab onClick={addService} className={classes.fab} color="primary">
            <Add />
          </Fab>
        </Container>
      )}
    </>
  );
};

