import React from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import TaxiServicesIcon from "@mui/icons-material/LocalTaxi";
import ExpensesIcon from "@mui/icons-material/ShoppingCart";

import { ExpensesSettings } from "../containers/ExpensesSettings";
import { Providers } from "../containers/Providers";

import { Layout } from "../components/Layout";
import { Settings } from "../components/Settings";
import { Init } from "../components/Init";
import { actions, getSettings, SettingsState } from "../slices/settings";

export const SettingsPage = () => {
  const { t } = useTranslation();

  const steps = [
    {
      name: "services",
      label: t("taxi-services-label"),
      component: Providers,
      icon: TaxiServicesIcon,
    },
    {
      name: "expenses",
      label: t("expenses-label"),
      component: ExpensesSettings,
      icon: ExpensesIcon,
    },
  ];
  const { activeStep, done } = useSelector(getSettings, shallowEqual);

  const dispatch = useDispatch();

  const save = (data: Partial<SettingsState>) => dispatch(actions.save(data));

  const onNext = () => {
    if (activeStep < steps.length - 1) {
      save({ activeStep: activeStep + 1 });
    } else {
      save({ done: true });
    }
  };

  const onBack = () => save({ activeStep: activeStep - 1 });

  const onChangeStep = (componentName: string) => {};

  return (
    <Layout title={t("settings")} isShowNavigation={done}>
      {done ? (
        <Settings onChangeStep={onChangeStep} steps={steps} />
      ) : (
        <Init
          activeStep={activeStep}
          onBack={onBack}
          onNext={onNext}
          steps={steps}
        />
      )}
    </Layout>
  );
};

