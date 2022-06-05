import React from "react";
import { ConnectedRouter as CS } from "connected-react-router";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import teal from "@mui/material/colors/teal";
import { store, history } from "./store";
import { Home } from "./pages/Home";

import "./App.css";
import "./i18n";
import Income from "./pages/Income";

const ConnectedRouter = CS as any;

function App() {
  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: {
        main: "#197d73",
      },
    },
    status: {
      danger: "orange",
    },
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/income" render={() => <Income />} />
              <Route path="/" render={() => <Home />} />
            </Switch>
          </ConnectedRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
