import React, { FC } from "react";
import { makeStyles } from "@mui/styles";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import TableMUI from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { P } from "./MyHTML";

const useStyles = makeStyles((theme: any) => ({
  negativeValue: {
    color: theme.palette.error.main,
  },
  listIcon: {
    minWidth: 30,
  },
  tableCell: {
    padding: 0,
  },
  label: {
    color: theme.palette.primary.main,
    marginRight: 0,
    width: 100,
  },
}));

export type RowProps = {
  icon?: React.ReactElement;
  title: string;
  value?: any;
  ms?: string;
};

const Row: FC<RowProps> = ({ icon, title, value, ms }) => {
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell className={classes.tableCell} component="th" scope="row">
        <ListItem>
          {icon && (
            <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>
          )}
          <P variant="subtitle2" className={classes.label}>
            {title}
            {value ? ":" : ""}
          </P>
        </ListItem>
      </TableCell>
      <TableCell align="right">
        {value && <P variant="subtitle2">{`${value} ${ms}`}</P>}
      </TableCell>
    </TableRow>
  );
};

export const Table: FC<{ rows: RowProps[] }> = ({ rows }) => (
  <TableMUI>
    <TableBody>
      {rows.map((row) => (
        <Row
          key={row.title}
          title={row.title}
          icon={row.icon}
          value={row.value}
          ms={row.ms}
        />
      ))}
    </TableBody>
  </TableMUI>
);
