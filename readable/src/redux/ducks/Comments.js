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
  DELETE_REQUEST: 'comments/DELETE_REQUEST',
  DELETE_SUCCESS: 'comments/DELETE_SUCCESS',
  DELETE_FAILURE: 'comments/DELETE_FAILURE',
  UPDATE_REQUEST: 'comments/UPDATE_REQUEST',
  UPDATE_SUCCESS: 'comments/UPDATE_SUCCESS',
  UPDATE_FAILURE: 'comments/UPDATE_FAILURE',
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
    case Types.DELETE_REQUEST:
      return { ...state, loading: true };
    case Types.DELETE_SUCCESS:
      return { ...state, loading: false, error: null };
    case Types.DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case Types.UPDATE_REQUEST:
      return { ...state, loading: true };
    case Types.UPDATE_SUCCESS:
      return { ...state, loading: false, error: null };
    case Types.UPDATE_FAILURE:
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

  deleteRequest: (commentId, parentId) => ({
    type: Types.DELETE_REQUEST,
    payload: {
      commentId,
      parentId,
    },
  }),

  deleteSuccess: () => ({
    type: Types.DELETE_SUCCESS,
  }),

  deleteFailure: error => ({
    type: Types.DELETE_FAILURE,
    payload: {
      error,
    },
  }),
  updateRequest: comment => ({
    type: Types.UPDATE_REQUEST,
    payload: {
      comment,
    },
  }),

  updateSuccess: () => ({
    type: Types.UPDATE_SUCCESS,
  }),

  updateFailure: error => ({
    type: Types.UPDATE_FAILURE,
    payload: {
      error,
    },
  }),
};
