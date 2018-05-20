export const Types = {
  GET_REQUEST: 'posts/GET_REQUEST',
  GET_SUCCESS: 'posts/GET_SUCCESS',
  GET_FAILURE: 'posts/GET_FAILURE',
  CREATE_REQUEST: 'posts/CREATE_REQUEST',
  CREATE_SUCCESS: 'posts/CREATE_SUCCESS',
  CREATE_FAILURE: 'posts/CREATE_FAILURE',
  SORT_REQUEST: 'posts/SORT_REQUEST',
  SORT_SUCCESS: 'posts/SORT_SUCCESS',
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
    case Types.CREATE_REQUEST:
      return { ...state, loading: true };
    case Types.CREATE_SUCCESS:
      return { ...state, loading: false, error: null };
    case Types.CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case Types.SORT_REQUEST:
      return { ...state, loading: true };
    case Types.SORT_SUCCESS:
      return { data: action.payload.data, loading: false, error: null };
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
  createPostRequest: post => ({
    type: Types.CREATE_REQUEST,
    payload: {
      post,
    },
  }),

  createPostSuccess: () => ({
    type: Types.CREATE_SUCCESS,
  }),

  createPostFailure: error => ({
    type: Types.CREATE_FAILURE,
    payload: {
      error,
    },
  }),

  sortPostRequest: type => ({
    type: Types.SORT_REQUEST,
    payload: {
      type,
    },
  }),

  sortPostSucess: data => ({
    type: Types.GET_SUCCESS,
    payload: {
      data,
    },
  }),
};
