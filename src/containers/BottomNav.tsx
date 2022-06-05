import React, { FC } from "react";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import StatIcon from "@mui/icons-material/ShowChart";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SettingsIcon from "@mui/icons-material/Settings";

import { router } from "../router";

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
  },
  bottomNav: {
    zIndex: 9,
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

type BottomNavProps = {
  isKeyboardHidden: boolean;
  pathname: string;
  onChange: (event: React.ChangeEvent<{}>, value: string) => void;
};

export const BottomNav: FC<BottomNavProps> = ({
  isKeyboardHidden,
  pathname,
  onChange
}) => {
  const classes = useStyles();
  const { t } = useTranslation();


  return (
    <div className={classes.root}>
      {isKeyboardHidden && (
        <BottomNavigation
          value={pathname}
          onChange={onChange}
          className={classes.bottomNav}
        >
          <BottomNavigationAction
            label={t("statistics")}
            value={router.statistics}
            icon={<StatIcon />}
          />
          <BottomNavigationAction
            label={t("balance")}
            value={router.balance}
            icon={<DirectionsCarIcon />}
          />
          <BottomNavigationAction
            label={t("settings")}
            value={router.settings}
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      )}
    </div>
  );
};
