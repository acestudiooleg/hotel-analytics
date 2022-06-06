import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import GoodProfitIcon from "@mui/icons-material/Mood";
import BadProfitIcon from "@mui/icons-material/MoodBad";
import NormalProfitIcon from "@mui/icons-material/SentimentSatisfied";
import DeleteIcon from "@mui/icons-material/Close";
import { calcPercent } from "../utils";
import { Layout } from "../components/Layout";
import { Container, D11, D12, P } from "../components/MyHTML";
import { Input } from "../containers/Input";
import { DateInput } from "../containers/Date";
import { goToBalance } from "../router";
import { Table } from "../components/Table";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Selectbox, Option } from "../components/Selectbox";
import IconButton from "@mui/material/IconButton";
import { MultiSelectbox } from "../components/MultiSelectbox";

// import { getTaxiServices } from "../reducers/taxiServices";
// import { getSettings } from "../reducers/settings";

const useStyles = makeStyles((theme: any) => ({
  content: {
    position: "relative",
    height: "100%",
    minHeight: 700,
  },
  fields: {
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttons: {
    marginTop: 15,
    width: "100%",
  },

  radios: {
    display: "flex",
  },

  input: {
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  datepicker: {
    width: "100%",
    marginRight: 10,
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

type State = {
  init: false;
  timestamp: Date;
  money: null;
  provider: string;
  nightsQty: number;
  peopleQty: number;
  customerName: string;
  nationality: string;
  roomNumber: null;
  roomBill: number;
  roomBillCurrency: string;
  restaurantBill: number;
  restaurantBillCurrency: string;
  rooms: Option[];
};

const Income = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const initState: State = {
    init: false,
    timestamp: new Date(),
    money: null,
    provider: "booking",
    nightsQty: 7,
    peopleQty: 2,
    customerName: "",
    nationality: "",
    roomNumber: null,
    roomBill: 0,
    roomBillCurrency: "usd",
    restaurantBill: 0,
    restaurantBillCurrency: "usd",
    rooms: [],
  };

  const nightsMarks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 7,
      label: "7",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 14,
      label: "14",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 30,
      label: "30+",
    },
  ];

  const peopleMarks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10+",
    },
  ];

  const providersOptions: Option[] = [
    {
      label: "Booking",
      value: "booking",
    },
    {
      label: "Private",
      value: "Provider",
    },
    {
      label: "Friends",
      value: "friends",
    },
  ];

  const roomsOptions = [
    { value: 1, label: "1 - Queen" },
    { value: 2, label: "2 - King" },
    { value: 3, label: "3 - Luxary Family Garden" },
    { value: 4, label: "4 - Family Pool" },
    { value: 5, label: "5 - Family Pool" },
    { value: 6, label: "6 - Luxary Family Pool" },
    { value: 7, label: "7 - Family Pool" },
    { value: 8, label: "8 - Family Pool" },
    { value: 9, label: "9 - Border View" },
    { value: 10, label: "10 - Luxury Family Nest" },
    { value: 11, label: "11 - African Bungalo" },
    { value: 12, label: "12 - Economy Family" },
    { value: 13, label: "13 - Economy Family" },
    { value: 14, label: "14 - Economy Family Double" },
    { value: 15, label: "15 - Economy Single" },
  ];

  const currencyOptions = [
    {
      value: "usd",
      label: "USD",
    },
    {
      value: "eur",
      label: "EUR",
    },
    {
      value: "tzh",
      label: "TZH",
    },
  ];
  const currencyMap: Record<string, number> = {};

  const currencyMarks = currencyOptions.map((option, i) => {
    currencyMap[option.value] = i + 1;
    return {
      label: option.label,
      value: i + 1,
    };
  });

  const [state, setState] = useState(initState);

  type K = keyof typeof initState;

  const setData =
    (key: K) =>
    ({ target: { value } }: any) =>
      setState({ ...state, [key]: value });

  const setCurrency =
    (key: K) =>
    ({ target: { value } }: any) =>
      setState({
        ...state,
        [key]: currencyOptions.find(
          (co) =>
            co.label === currencyMarks.find((c) => c.value === value)?.label
        )?.value,
      });

  const handleDate = (timestamp: Date) => setState({ ...state, timestamp });

  const makeInput = (
    label: string,
    key: K,
    end: any,
    value: any,
    isControlled?: boolean
  ) => (
    <Input
      label={t(label)}
      defaultValue={isControlled ? undefined : value}
      value={!isControlled ? undefined : value}
      type="number"
      onChange={setData(key)}
      end={end}
    />
  );

  const setRooms = (rooms: Option[]) => {
    console.log({ rooms });

    setState({ ...state, rooms });
  };

  const removeRoom = (room: Option) => {
    const rooms = state.rooms.filter((r) => r.value !== room.value);
    setRooms(rooms);
  };

  const save = () => {
    const { money, timestamp } = state;

    if (money) {
      console.log(money, timestamp);

      // dispatch(
      //   actions.add({
      //     timestamp,
      //     money,
      //   })
      // );
    } else {
      window.alert(t("ride-data-validation-error"));
    }
  };

  const rows: any[] = [];

  return (
    <Layout title={t("earn")}>
      <div className={classes.content}>
        <div className={classes.fields}>
          <Container spacing={1} justifyContent="center">
            <D12 className={classes.row}>
              <DateInput
                label={t("date")}
                className={classes.datepicker}
                value={state.timestamp}
                onChange={handleDate}
              />
            </D12>
            <D12 mt={1} className={classes.row}>
              <Selectbox
                label={t("provider")}
                options={providersOptions}
                value={state.provider}
                onChange={setData("provider")}
                formProps={{
                  fullWidth: true,
                }}
              />
            </D12>
            <D12 className={classes.row}>
              <List>
                {state.rooms.map((room, i) => (
                  <>
                    {i > 0 && <Divider />}
                    <ListItem
                      key={room.label}
                      secondaryAction={
                        <IconButton
                          onClick={() => removeRoom(room)}
                          edge="end"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <P variant="subtitle2" className={classes.label}>
                        {room.label}
                      </P>
                    </ListItem>
                  </>
                ))}
              </List>
            </D12>
            <D12 className={classes.row}>
              <MultiSelectbox
                label={t("room")}
                placeholder={t("select-room")}
                value={state.rooms.map((room) => room.label).join(", ")}
                options={roomsOptions}
                onSelect={setRooms}
                formProps={{
                  fullWidth: true,
                }}
              />
            </D12>
            <D12 className={classes.row}>
              {makeInput(
                "nightsQty",
                "nightsQty",
                "nights",
                state.nightsQty,
                true
              )}
              <Slider
                defaultValue={7}
                min={1}
                max={30}
                marks={nightsMarks}
                onChange={setData("nightsQty")}
                value={state.nightsQty}
                valueLabelDisplay="auto"
              />
            </D12>
            <D12 className={classes.row}>
              {makeInput(
                "peopleQty",
                "peopleQty",
                "people",
                state.peopleQty,
                true
              )}
              <Slider
                defaultValue={2}
                min={1}
                max={10}
                marks={peopleMarks}
                onChange={setData("peopleQty")}
                value={state.peopleQty}
                valueLabelDisplay="auto"
              />
            </D12>
            <D12 className={classes.row}>
              {makeInput(
                "roomBill",
                "roomBill",
                <Selectbox
                  options={currencyOptions}
                  value={state.roomBillCurrency}
                  onChange={setData("roomBillCurrency")}
                  selectProps={{
                    variant: "standard",
                  }}
                />,

                state.roomBill
              )}
              <Slider
                min={Math.min(...currencyMarks.map((m) => m.value))}
                max={Math.max(...currencyMarks.map((m) => m.value))}
                marks={currencyMarks}
                onChange={setCurrency("roomBillCurrency")}
                value={currencyMap[state.roomBillCurrency]}
                valueLabelDisplay="auto"
              />
            </D12>
            <D12 className={classes.row}>
              {makeInput(
                "restaurantBill",
                "restaurantBill",
                <Selectbox
                  options={currencyOptions}
                  value={state.restaurantBillCurrency}
                  onChange={setData("restaurantBillCurrency")}
                  selectProps={{
                    variant: "standard",
                  }}
                />,

                state.restaurantBill
              )}
              <Slider
                min={Math.min(...currencyMarks.map((m) => m.value))}
                max={Math.max(...currencyMarks.map((m) => m.value))}
                marks={currencyMarks}
                onChange={setCurrency("restaurantBillCurrency")}
                value={currencyMap[state.restaurantBillCurrency]}
                valueLabelDisplay="auto"
              />
            </D12>
          </Container>
        </div>
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
                onClick={() => goToBalance(dispatch)}
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

export default Income;
