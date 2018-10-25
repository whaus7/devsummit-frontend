const initialState = {
  list: [],
  loading: null,
  error: null,
};


export default function meteoriteReducer(state = initialState, action) {
  switch (action.type) {
    case 'METEORITES_GET_LIST':
      return {...state, loading: 'list' };
    case 'METEORITES_GET_LIST_SUCCESS':
      return { ...state,
        list: action.payload,
        loading: null,
      };
    case 'METEORITES_GET_LIST_FAILURE':
      return {...state,
        loading: null,
        error: action.payload,
      };
    case 'LOGOUT_USER':
      return { ...initialState };
    default:
      return state;
  }
}
