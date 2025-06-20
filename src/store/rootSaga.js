import { all } from 'redux-saga/effects'
import homeSaga from '@/apis/home/homeApis'
// Here you can include all the saga which you write for components

export default function* rootSaga() {
  // yield all([AuthenticationSaga()]),
  // yield all([FormsSaga()])
  yield all([homeSaga()]);
}
