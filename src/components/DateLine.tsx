import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Paper from "@mui/material/Paper";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DateTime } from "luxon";
import { P } from "./MyHTML";

export const makeDayLine = (() => {
  const cache = { time: DateTime.now() };
  return (date: string) => {
    if (DateTime.fromISO(date).hasSame(cache.time, "day")) {
      return "";
    }
    cache.time = DateTime.fromISO(date);
    return <DateLine date={date} />;
  };
})();

export const useStyles = makeStyles((theme: any) => ({
  icon: {
    fontSize: 20,
    color: theme.palette.primary.contrastText,
  },
  label: {
    fontSize: 12,
    color: theme.palette.primary.contrastText,
  },
  listItem: {
    backgroundColor: theme.palette.secondary.main,
  },

  listIcon: {
    minWidth: 30,
  },
}));

const DateLine: FC<{ date: string }> = ({ date }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const d = DateTime.fromISO(date);
  const isToday = DateTime.now().hasSame(d, "day");
  return (
    <Paper key={date}>
      <ListItem className={classes.listItem}>
        <ListItemIcon className={classes.listIcon}>
          <CalendarTodayIcon className={classes.icon} />
        </ListItemIcon>
        <P variant="subtitle2" className={classes.label}>
          {isToday ? t("today") : d.toFormat("DD MMMM HH:mm")}
        </P>
      </ListItem>
    </Paper>
  );
};
