import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PollIcon from "@mui/icons-material/Poll";
import CalendarTodayIcon from "@mui/icons-material/Today";

import { RowProps, Table } from "./Table";

export type BalanceTotalProps = {
  earn: number;
  balance: number;
  expenses: number;
  earnToday: number;
  currency: string;
  dateTitle: string;
  orders: number;
};

export const BalanceTotal: FC<BalanceTotalProps> = ({
  earn,
  balance,
  expenses,
  earnToday,
  currency,
  dateTitle,
  orders,
}) => {
  const { t } = useTranslation();

  const rows: RowProps[] = [
    {
      title: t("earn"),
      icon: <AttachMoneyIcon color="primary" />,
      value: earn.toFixed(2),
      ms: currency,
    },

    {
      title: t("expenses"),
      icon: <DirectionsCarIcon color="primary" />,
      value: expenses.toFixed(2),
      ms: currency,
    },
    {
      title: t("balance"),
      icon: <AccountBalanceWalletIcon color="primary" />,
      value: balance.toFixed(2),
      ms: currency,
    },
    {
      title: t("orders-qty"),
      icon: <PollIcon color="primary" />,
      value: orders,
      ms: "",
    },
  ];

  return <Table rows={rows} />;
};
