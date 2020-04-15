// actions types
const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// actions
export const bugAdded = description => {
  return {
    type: BUG_ADDED,
    payload: {
      description
    }
  };
};

export const bugRemoved = id => {
  return {
    type: BUG_REMOVED,
    payload: {
      id
    }
  };
};

export const bugResolved = id => {
  return {
    type: BUG_RESOLVED,
    payload: {
      id
    }
  };
};

// reducers
let lastId = 0;

const reducer = (state = [], action) => {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false
        }
      ];
    case BUG_RESOLVED: {
      return state.map(bug =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );
    }
    case BUG_REMOVED:
      return state.filter(bug => bug.id !== action.payload.id);
    default:
      return state;
  }
};

export default reducer;
