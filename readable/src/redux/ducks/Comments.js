export const Types = {
  GET_REQUEST: 'comments/GET_REQUEST',
  GET_SUCCESS: 'comments/GET_SUCCESS',
  GET_FAILURE: 'comments/GET_FAILURE',
};

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return { data: action.payload.data, loading: false, error: null };
    case Types.GET_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

export const Creators = {
  getCommentsRequest: id => ({
    type: Types.GET_REQUEST,
    payload: {
      id,
    },
  }),

  getCommentsSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: {
      data,
    },
  }),

  getCommentsFailure: error => ({
    type: Types.GET_FAILURE,
    payload: {
      error,
    },
  }),
};
