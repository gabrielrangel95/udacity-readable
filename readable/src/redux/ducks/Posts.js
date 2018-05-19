export const Types = {
  GET_REQUEST: 'posts/GET_REQUEST',
  GET_SUCCESS: 'posts/GET_SUCCESS',
  GET_FAILURE: 'posts/GET_FAILURE',
};

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default function posts(state = initialState, action) {
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
  getPostsRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  getPostsSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: {
      data,
    },
  }),

  getPostsFailure: error => ({
    type: Types.GET_FAILURE,
    payload: {
      error,
    },
  }),
};
