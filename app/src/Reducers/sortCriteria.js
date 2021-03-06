import {
  ADD_SORT_CRITERIA,
  CHANGE_SORT_CRITERIA_PROPERTY,
  CHANGE_SORT_CRITERIA_DIRECTION,
  MOVE_SORT_CRITERIA,
  REMOVE_SORT_CRITERIA
} from "../Actions";
import uuidv4 from "uuid/v4";

import sortClassMap from "../SortCriteria/sortMapping";

const properties = Object.keys(sortClassMap);

export default (state = [], action) => {
  switch (action.type) {
    case ADD_SORT_CRITERIA:
      return [...state, { id: uuidv4(), property: properties[0], direction: sortClassMap[properties[0]].initialDirection }]
    case CHANGE_SORT_CRITERIA_PROPERTY:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], { property: action.property, direction: sortClassMap[action.property].initialDirection }),
        ...state.slice(action.index + 1)
      ];
    case CHANGE_SORT_CRITERIA_DIRECTION:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], { direction: action.direction }),
        ...state.slice(action.index + 1)
      ];
    case MOVE_SORT_CRITERIA:
      if (action.direction === "up") {
        return [
          ...state.slice(0, action.index - 1),
          { ...state[action.index] },
          { ...state[action.index - 1] },
          ...state.slice(action.index + 1)
        ];
      }
      else /*if (action.direction === "down")*/ {
        return [
          ...state.slice(0, action.index),
          { ...state[action.index + 1] },
          { ...state[action.index] },
          ...state.slice(action.index + 2)
        ];
      }
    case REMOVE_SORT_CRITERIA:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
    default:
      return state;
  }
}