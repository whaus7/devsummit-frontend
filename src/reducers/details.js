const initialState = {
  meteorite: {},
  loading: false,
  error: null,
};


export default function detailsReducer(state = initialState, action) {
  switch (action.type) {
    case 'MTR_DETAILS_GET_ID':
      return {...state, loading: true };
    case 'MTR_DETAILS_GET_ID_SUCCESS':
      return { ...state,
        meteorite: action.payload,
        loading: false,
      };
    case 'MTR_DETAILS_GET_ID_FAILURE':
      return {...state,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT_USER':
      return { ...initialState };
    default:
      return state;
  }
}
