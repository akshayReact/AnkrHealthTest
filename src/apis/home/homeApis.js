import { all, call, put, takeLatest, takeEvery } from "redux-saga/effects";
import {
  getJobsList,
  getJobsListSuccess,
  getJobsListFailure
} from "./homeSlice";
import { postRequest, getRequest, postRequestHeader } from "../axiosClient";
import { API_CONSTANTS as constants } from '@/constants'
import axios from "axios";

const API_KEY = "sk-live-1zK8tiRvf0WTIKNhVDYK2mGefXG2MhvDQOZZy9GD"

function* getJobListApi(action) {
  try {
    const params = new URLSearchParams(action.payload);
    const paramStr = params?.toString();
    const response = yield call(() =>
      getRequest(`${"jobs/simple-paginate"}?${paramStr}`, action.payload)
    );

    // const response = yield call(() => getRequest("jobs/simple-paginate"));
    yield put(getJobsListSuccess(response.data));
  } catch (error) {
    console.error(error)
    yield put(getJobsListFailure(JSON.stringify(error?.response?.data)));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(getJobsList, getJobListApi)]);
}
