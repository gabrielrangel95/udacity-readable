export const Types = {
  GET_REQUEST: 'comments/GET_REQUEST',
  GET_SUCCESS: 'comments/GET_SUCCESS',
  GET_FAILURE: 'comments/GET_FAILURE',
  CREATE_REQUEST: 'comments/CREATE_REQUEST',
  CREATE_SUCCESS: 'comments/CREATE_SUCCESS',
  CREATE_FAILURE: 'comments/CREATE_FAILURE',
  VOTE_REQUEST: 'comments/VOTE_REQUEST',
  VOTE_SUCCESS: 'comments/VOTE_SUCCESS',
  VOTE_FAILURE: 'comments/VOTE_FAILURE',
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
    case Types.CREATE_REQUEST:
      return { ...state, loading: true };
    case Types.CREATE_SUCCESS:
      return { ...state, loading: false, error: null };
    case Types.CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case Types.VOTE_REQUEST:
      return { ...state, loading: true };
    case Types.VOTE_SUCCESS:
      return { ...state, loading: false, error: null };
    case Types.VOTE_FAILURE:
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

  createRequest: comment => ({
    type: Types.CREATE_REQUEST,
    payload: {
      comment,
    },
  }),

  createSuccess: () => ({
    type: Types.CREATE_SUCCESS,
  }),

  createFailure: error => ({
    type: Types.CREATE_FAILURE,
    payload: {
      error,
    },
  }),

  voteRequest: (id, option, parentId) => ({
    type: Types.VOTE_REQUEST,
    payload: {
      id,
      option,
      parentId,
    },
  }),

  voteSuccess: () => ({
    type: Types.VOTE_SUCCESS,
  }),

  voteFailure: error => ({
    type: Types.VOTE_FAILURE,
    payload: {
      error,
    },
  }),
};
