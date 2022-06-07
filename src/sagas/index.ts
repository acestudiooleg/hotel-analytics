import { all } from "redux-saga/effects";
import providersSaga from "./providers";

export function createRootSaga() {
  const sagas: any[] = [providersSaga()];

  return function* rootSaga() {
    yield all(sagas);
  };
}
