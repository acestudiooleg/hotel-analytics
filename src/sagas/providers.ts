import { call, put, takeEvery } from "redux-saga/effects";
import { actions, types } from "../slices/providers";
import db from "../lsdb";
import { TSaga } from "./types";
import { Action } from "../slices/types";
import { Provider } from "../slices/providers";

export function* read(): TSaga<any, Record<string, any>> {
  return yield call([db.provider, db.provider.read]);
}

export function* save({
  payload: providers,
}: Action<Required<Provider>[]>): TSaga<Provider[]> {
  try {
    const data = yield call([db.provider, db.provider.update], providers);

    yield put(actions.saveSuccess(data));
  } catch (error) {
    yield put(actions.saveFailure({ error }));
  }
}

export function* add({ payload }: Action<Provider>): TSaga<Provider[]> {
  try {
    console.log("add", payload);

    const data = yield call([db.provider, db.provider.create], payload);

    yield put(actions.addSuccess(data));
  } catch (error) {
    yield put(actions.saveFailure(error));
  }
}

export function* remove({
  payload,
}: Action<Required<Provider>>): TSaga<Provider[]> {
  try {
    const data = yield call([db.provider, db.provider.delete], payload);

    yield put(actions.removeSuccess(data));
  } catch (error) {
    yield put(actions.saveFailure(error));
  }
}

export default function* providersSaga() {
  yield takeEvery(types.save, save);
  yield takeEvery(types.add, add);
  yield takeEvery(types.remove, remove);
}
