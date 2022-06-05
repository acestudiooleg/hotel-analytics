import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import Swipe from "react-easy-swipe";

import { makeStyles } from "@mui/styles";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { Container, D12 } from "./MyHTML";
import { goToBalance } from "../router";

const useStyles = makeStyles((theme: any) => ({
  stepComponent: {
    width: "100%",
    overflow: "auto",
    height: "calc(100vh - 140px)",
  },
  bottomNav: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    width: "100%",
  },
}));

type SettingsStep = {
  name: string;
  label: string;
  icon: FC;
  component: FC;
};

type SettingsProps = {
  steps: SettingsStep[];
  onChangeStep: (name: SettingsStep["name"]) => void;
};

export const Settings: FC<SettingsProps> = ({ steps, onChangeStep }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeTabNum, setTabNum] = useState(0);
  const { component: CurrentStepComponent } = steps[activeTabNum];

  const swipeLeft = () => {
    if (activeTabNum < steps.length) {
      setTabNum(activeTabNum + 1);
    }
  };

  const swipeRight = () => {
    if (activeTabNum > 0) {
      setTabNum(activeTabNum - 1);
    } else {
      goToBalance(dispatch);
    }
  };

  const changePage = (e: any, tabNum: number) => {
    setTabNum(tabNum);
    onChangeStep(steps[tabNum].name);
  };

  return (
    <Swipe tolerance={100} onSwipeLeft={swipeLeft} onSwipeRight={swipeRight}>
      <Container>
        <D12>
          <BottomNavigation
            value={activeTabNum}
            onChange={changePage}
            className={classes.bottomNav}
          >
            {steps.map((el, index) => (
              <BottomNavigationAction
                key={el.name}
                label={el.label}
                value={index}
                icon={<el.icon />}
              />
            ))}
          </BottomNavigation>
        </D12>

        <div className={classes.stepComponent}>
          {CurrentStepComponent && (
            <CurrentStepComponent key={new Date().toISOString()} />
          )}
        </div>
      </Container>
    </Swipe>
  );
};
