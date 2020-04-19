const initialState = {
  getting: false,
  value: null,
  editOpen: false,
  editing: false,
};
export default field => (state = initialState, action) => {
  switch (action.type) {
    case field.REQUEST_GET: return {
      ...state,
      getting: true,
      value: null,
    };
    case field.RECEIVE_GET: return {
      ...state,
      getting: false,
      value: action.value,
    };
    case field.CHANGE_EDIT: return {
      ...state,
      editOpen: !state.editOpen,
    };
    case field.REQUEST_SET: return {
      ...state,
      editing: true,
    };
    case field.RECEIVE_SET: return {
      ...state,
      editing: false,
    };
    default: return state;
  }
};
