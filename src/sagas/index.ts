import { all } from "redux-saga/effects";
export function createRootSaga() {
  const sagas: any[] = [];

  return function* rootSaga() {
    yield all(sagas);
  };
}
