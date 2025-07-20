import { call, put, takeLatest } from "redux-saga/effects";
import {
  CHECK_AUTH_REQUEST,
  checkAuthFailure,
  checkAuthSuccess,
  LOGIN_REQUEST,
  loginFailure,
  loginSuccess,
} from "../actions/action";
import { login } from "@/service/auth/login";
import { me } from "@/service/auth/me";

function* handleLogin(action: any): any {
  try {
    yield call(login, action.payload);
    const user = yield call(me);
    yield put(loginSuccess(user));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}
function* handleCheckAuth(): any {
  try {
    const user = yield call(me);
    yield put(checkAuthSuccess(user));
  } catch (error) {
    yield put(checkAuthFailure());
  }
}

export default function* rootSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(CHECK_AUTH_REQUEST, handleCheckAuth);
}
