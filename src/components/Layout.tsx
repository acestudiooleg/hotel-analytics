import React, { FC } from "react";
import { push } from "connected-react-router";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import get from 'lodash/get';

import { LangSwitch } from "./LangSwitch";
import { BottomNav } from "../containers/BottomNav";
import { H6 } from "./MyHTML";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  isShowNavigation?: boolean;
};

export const Layout: FC<LayoutProps> = ({
  title,
  children,
  isShowNavigation,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isKeyboardHidden = useSelector((state: any) => state?.keyboard?.hidden);
  const pathname = useSelector(
    (state) => get(state, "router.location.pathname") || ""
  );

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <H6 className={classes.title}>{title}</H6>
          <LangSwitch />
        </Toolbar>
      </AppBar>
      {children}
      {isShowNavigation && (
        <BottomNav
          pathname={pathname}
          isKeyboardHidden={isKeyboardHidden}
          onChange={(event, newValue) => {
            dispatch(push(newValue));
          }}
        />
      )}
    </div>
  );
};
