import { combineReducers, configureStore, } from "@reduxjs/toolkit";
import home from '@/apis/home/homeSlice'
import { rootReducer } from "./store/rootReducers";

export function createTestStore() {
  const store = configureStore(
    combineReducers({
      reducer: rootReducer
    })
  );
  return store;
}

export async function makeRequest() {
	const res = await fetch('https://jsonfakery.com/jobs/simple-paginate?page=1');
	return res.json();
}