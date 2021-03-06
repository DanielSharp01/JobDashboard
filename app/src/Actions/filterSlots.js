import {
  RECIEVE_FILTER_SLOTS,
  ADD_FILTER_SLOT,
  CHANGE_FILTER_SLOT_ADD_TEXT,
  CHANGE_FILTER_SLOT,
  RENAME_FILTER_SLOT,
  REMOVE_FILTER_SLOT,
  SAVING_FILTER_SLOT,
  SAVED_FILTER_SLOT
} from "./index";

import { getFilters } from "../Reducers/filterSlots";

export function recieveFilterSlots(slots) {
  return {
    type: RECIEVE_FILTER_SLOTS,
    slots
  }
}

export function fetchFilterSlots() {
  return async (dispatch) => {
    try {
      let res = await fetch("filter-slots");
      let slots = await res.json();
      dispatch(recieveFilterSlots(slots));
    }
    catch (err) {
      console.error(err);
      // TODO: Maybe handle in the future
    }
  }
}

export function addFilterSlot() {
  return {
    type: ADD_FILTER_SLOT,
  }
}

export function changeFilterSlotAddText(text) {
  return {
    type: CHANGE_FILTER_SLOT_ADD_TEXT,
    text
  }
}

export function changeFilterSlot(name) {
  return {
    type: CHANGE_FILTER_SLOT,
    name
  }
}

export function renameFilterSlot() {
  return {
    type: RENAME_FILTER_SLOT
  }
}

export function renameFilterSlotOnServer() {
  return async (dispatch, getState) => {
    try {
      let selectedSlot = getState().filterSlots.selectedSlot;
      dispatch(renameFilterSlot());
      let body = { slot: selectedSlot }
      if (!getState().filterSlots.slots[selectedSlot].saved) return;
      await fetch("filter-slots", {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: new Headers({ 'content-type': 'application/json' })
      });
      dispatch(saveFilterSlot());
    }
    catch (err) {
      console.error(err);
      // TODO: Maybe handle in the future
    }
  }
}

export function removeFilterSlot() {
  return async (dispatch, getState) => {
    try {
      let body = { slot: getState().filterSlots.selectedSlot }
      dispatch({ type: REMOVE_FILTER_SLOT });
      await fetch("filter-slots", {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: new Headers({ 'content-type': 'application/json' })
      });
    }
    catch (err) {
      console.error(err);
      // TODO: Maybe handle in the future
    }
  }
}

export function savingFilterSlot() {
  return {
    type: SAVING_FILTER_SLOT
  }
}

export function saveFilterSlot() {
  return async (dispatch, getState) => {
    let filterSlots = getState().filterSlots;
    try {
      dispatch(savingFilterSlot(filterSlots.selectedSlot));
      let body = { slot: filterSlots.selectedSlot, content: getFilters(filterSlots) };
      await fetch("filter-slots", {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({ 'content-type': 'application/json' })
      });
      dispatch(savedFilterSlot(filterSlots.selectedSlot, true));
    }
    catch (err) {
      dispatch(savedFilterSlot(filterSlots.selectedSlot, false));
    }
  }
}

export function savedFilterSlot(name, success) {
  return {
    type: SAVED_FILTER_SLOT,
    name,
    success
  }
}