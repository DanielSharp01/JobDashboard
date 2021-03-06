import objectUtils from "./objectUtils";
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import reducer from "./Reducers";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import App from './Components/App/App';
import { fetchJobs, recieveJobsThunk, removeJobs } from './Actions/jobs';
import { fetchFilterSlots } from "./Actions/filterSlots";
import { fetchSortCriteriaSlots } from "./Actions/sortCriteriaSlots";
let env = 'dev';

objectUtils(); // Creates util functions on Object

const logMW = (store) => (next) => {
  return (action) => {
    console.group((typeof action.type !== "undefined") ? action.type : "redux-thunk");
    console.log("Before", store.getState());
    console.log("Action", action);
    const retVal = next(action);
    console.log("After", store.getState());
    console.groupEnd();
    return retVal;
  }
}

const store = createStore(reducer, (env === "dev") ? applyMiddleware(logMW, thunk) : applyMiddleware(thunk));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
store.dispatch(fetchJobs());
store.dispatch(fetchFilterSlots());
store.dispatch(fetchSortCriteriaSlots());

const sseSource = new EventSource('/job-events');
sseSource.addEventListener('added-jobs', (e) => {
  store.dispatch(recieveJobsThunk(JSON.parse(e.data)));
});

sseSource.addEventListener('removed-jobs', (e) => {
  store.dispatch(removeJobs(JSON.parse(e.data)));
});