// action creators.
const addMatch = () => {
    return {
      type: ADD_MATCH,
      payload: {
        total: 0,
      },
    };
  };

  // initial state.
const initialState = {
    uuid: 2,
    matches: [{ id: 1, total: 0 }],
  };


switch (action.type) {
    // add a new match.
    case ADD_MATCH: {

      return {
        ...state,
        uuid: state.uuid + 1,
        matches:  [...state.matches, {
            id: state.uuid,
            total: action.payload.total,
          }],
      };
 
    }



}