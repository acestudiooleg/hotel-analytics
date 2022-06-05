import { routerMiddleware } from "connected-react-router";
import { configureStore as CS } from "@reduxjs/toolkit";
import createSagaMonitor from "@clarketm/saga-monitor";
import createSagaMiddleware from "redux-saga";
import { createRootReducer } from "./reducers";
import { createRootSaga } from "./sagas";
import { selectorsLogger } from "./selectorsLogger";
import { createBrowserHistory, History } from "history";

export const history = createBrowserHistory();

export function configureStore(rootSaga: any, history: History) {
  const isDevelopment = true;
  const sagaMonitorConfig = {
    level: "debug", // logging level
    verbose: true, // verbose mode
    effectCancel: true, // show cancelled effects
    actionDispatch: true, // show dispatched actions
  };

  let sagaMonitor: any;

  if (isDevelopment) {
    // sagaMonitor = createSagaMonitor(sagaMonitorConfig);
  }

  const sagaMiddleware = createSagaMiddleware({
    sagaMonitor,
  });

  let selectorMonitor: any;

  if (isDevelopment) {
    selectorMonitor = selectorsLogger();
  }


  const store = CS({
    reducer: createRootReducer(history),
    middleware: (getDefMid) =>
      getDefMid().concat([
        routerMiddleware(history),
        sagaMiddleware,
        selectorMonitor,
      ]),
    devTools: true,
  });

  sagaMiddleware.run(rootSaga);
  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createRootReducer(history) as any);
    });
  }

  return store;
}

export const store = configureStore(createRootSaga(), history);
// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
