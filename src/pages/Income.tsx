import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import GoodProfitIcon from "@mui/icons-material/Mood";
import BadProfitIcon from "@mui/icons-material/MoodBad";
import NormalProfitIcon from "@mui/icons-material/SentimentSatisfied";
import EqualizerIcon from "@mui/icons-material/Equalizer";
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

const Earn = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const initState = {
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
    restaurantBill: 0,
  };

  const [state, setState] = useState(initState);

  type K = keyof typeof initState;

  const setData =
    (key: K) =>
    ({ target: { value } }: any) =>
      setState({ ...state, [key]: value });

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
              <FormControl fullWidth>
                <InputLabel id="provider">Провайдер</InputLabel>
                <Select
                  labelId="provider"
                  id="provider-select"
                  value={state.provider}
                  label="Provider"
                  onChange={setData("provider")}
                >
                  <MenuItem value={"booking"}>Booking</MenuItem>
                  <MenuItem value={"private"}>Private</MenuItem>
                  <MenuItem value={"friends"}>Friends</MenuItem>
                </Select>
              </FormControl>
            </D12>
            <D12 className={classes.row}>
              {makeInput(
                "Кол-во ночей",
                "nightsQty",
                "ночей",
                state.nightsQty,
                true
              )}
              <Slider
                defaultValue={7}
                min={1}
                max={30}
                onChange={setData("nightsQty")}
                value={state.nightsQty}
                valueLabelDisplay="auto"
              />
            </D12>
            <D12 className={classes.row}>
              {makeInput(
                "Кол-во людей",
                "peopleQty",
                "людей",
                state.peopleQty,
                true
              )}
              <Slider
                defaultValue={2}
                min={1}
                max={10}
                onChange={setData("peopleQty")}
                value={state.peopleQty}
                valueLabelDisplay="auto"
              />
            </D12>
            <D12 className={classes.row}>
              <List>
                <ListItem>
                  <P variant="subtitle2" className={classes.label}>
                    1 - Queen
                  </P>
                </ListItem>
                <Divider />
                <ListItem>
                  <P variant="subtitle2" className={classes.label}>
                    3 - Luxary Family Garden
                  </P>
                </ListItem>
              </List>
            </D12>
            <D12 className={classes.row}>
              <FormControl fullWidth>
                <InputLabel id="provider">Комната</InputLabel>
                <Select
                  labelId="provider"
                  id="provider-select"
                  label="Provider"
                  onChange={setData("provider")}
                >
                  <MenuItem value={1}>1 - Queen</MenuItem>
                  <MenuItem value={2}>2 - King</MenuItem>
                  <MenuItem value={3}>3 - Luxary Family Garden</MenuItem>
                  <MenuItem value={4}>4 - Family Pool</MenuItem>
                  <MenuItem value={5}>5 - Family Pool</MenuItem>
                  <MenuItem value={6}>6 - Luxary Family Pool</MenuItem>
                  <MenuItem value={7}>7 - Family Pool</MenuItem>
                  <MenuItem value={8}>8 - Family Pool</MenuItem>
                  <MenuItem value={9}>9 - Border View</MenuItem>
                  <MenuItem value={1}>10 - Luxury Family Nest</MenuItem>
                  <MenuItem value={1}>11 - African Bungalo</MenuItem>
                  <MenuItem value={1}>12 - Economy Family</MenuItem>
                  <MenuItem value={1}>13 - Economy Family</MenuItem>
                  <MenuItem value={1}>14 - Economy Family Double</MenuItem>
                  <MenuItem value={1}>15 - Economy Single</MenuItem>
                </Select>
              </FormControl>
            </D12>
            <D12 className={classes.row}>
              {makeInput("Чек за комнату", "roomBill", "USD", state.roomBill)}
            </D12>
            <D12 className={classes.row}>
              {makeInput(
                "Чек за ресторан",
                "restaurantBill",
                "USD",
                state.restaurantBill
              )}
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

export default Earn;
