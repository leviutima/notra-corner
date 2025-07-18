import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST, loginFailure, loginSuccess } from "../actions/action";
import { login } from "@/service/auth/login";

function* handleLogin(action: any): any {
  try {
    const user = yield call(login, action.payload);
    yield put(loginSuccess(user));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

export default function* rootSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
