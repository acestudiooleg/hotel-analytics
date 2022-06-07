import React, { FC } from "react";
import { ConnectedRouter as CS } from "connected-react-router";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { Provider, shallowEqual, useSelector } from "react-redux";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import blue from "@mui/material/colors/blue";
import { store, history } from "./store";
import { Home } from "./pages/Home";
import { routes } from "./router";

import "./App.css";
import "./i18n";
import { IncomeRoom } from "./pages/IncomeRoom";
import { getSettings } from "./slices/settings";
import { SettingsPage } from "./pages/Settings";
import Statistics from "./pages/Statistics";
import Spend from "./pages/Spend";

const ConnectedRouter = CS as any;

interface RedirectRouteProps extends RouteProps {
  component: FC;
}

const RedirectRoute: FC<RedirectRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { hasData, done } = useSelector(getSettings, shallowEqual);
  const comp = (props: any) => {
    if (hasData && !done) {
      return <Redirect to={routes.settings} />;
    }
    return <Component {...props} />;
  };

  return <Route {...rest} render={comp} />;
};

function App() {
  const theme = createTheme({
    // palette: {
    //   primary: blue,
    //   secondary: {
    //     main: "#197d73",
    //   },
    // },
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
              <Route
                exact
                path={routes.root}
                render={() => <Redirect to={routes.balance} />}
              />
              <RedirectRoute exact path={routes.balance} component={Home} />
              <Route exact path={routes.settings} component={SettingsPage} />
              <RedirectRoute
                exact
                path={routes.statistics}
                component={Statistics}
              />
              {/* <RedirectRoute
                exact
                path={routes.editRide}
                component={EditRide}
              />
              <RedirectRoute
                exact
                path={`${routes.editRide}/:id`}
                component={EditRide}
              /> */}
              {/* <RedirectRoute
                exact
                path={routes.incomeRoom}
                component={IncomeRoom}
              />
              <RedirectRoute exact path={routes.spend} component={Spend} /> */}
            </Switch>
          </ConnectedRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
