export const Types = {
  GET_REQUEST: 'posts/GET_REQUEST',
  GET_SUCCESS: 'posts/GET_SUCCESS',
  GET_FAILURE: 'posts/GET_FAILURE',
  CREATE_REQUEST: 'posts/CREATE_REQUEST',
  CREATE_SUCCESS: 'posts/CREATE_SUCCESS',
  CREATE_FAILURE: 'posts/CREATE_FAILURE',
  SORT_REQUEST: 'posts/SORT_REQUEST',
  SORT_SUCCESS: 'posts/SORT_SUCCESS',
  FILTER_CATEGORY_REQUEST: 'posts/FILTER_CATEGORY_REQUEST',
  FILTER_CATEGORY_SUCESS: 'posts/FILTER_CATEGORY_SUCESS',
  GET_POST_REQUEST: 'posts/GET_POST_REQUEST',
  GET_POST_SUCCESS: 'posts/GET_POST_SUCCESS',
  GET_POST_FAILURE: 'posts/GET_POST_FAILURE',
  VOTE_REQUEST: 'post/VOTE_REQUEST',
  VOTE_SUCCESS: 'post/VOTE_SUCCESS',
  VOTE_FAILURE: 'post/VOTE_FAILURE',
  DELETE_REQUEST: 'post/DELETE_REQUEST',
  DELETE_SUCCESS: 'post/DELETE_SUCCESS',
  DELETE_FAILURE: 'post/DELETE_FAILURE',
  UPDATE_REQUEST: 'post/UPDATE_REQUEST',
  UPDATE_SUCCESS: 'post/UPDATE_SUCCESS',
  UPDATE_FAILURE: 'post/UPDATE_FAILURE',
};

const initialState = {
  data: [],
  loading: false,
  error: null,
  selected: null,
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
    case Types.FILTER_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case Types.FILTER_CATEGORY_SUCESS:
      return { data: action.payload.data, loading: false, error: null };
    case Types.GET_POST_REQUEST:
      return { ...state, loading: true };
    case Types.GET_POST_SUCCESS:
      return {
        ...state, selected: action.payload.selected, loading: false, error: null,
      };
    case Types.GET_POST_FAILURE:
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
  createPostRequest: (post,currentList) => ({
    type: Types.CREATE_REQUEST,
    payload: {
      post,
      currentList
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

  filterCategoryRequest: category => ({
    type: Types.FILTER_CATEGORY_REQUEST,
    payload: {
      category,
    },
  }),

  filterCategorySucess: data => ({
    type: Types.FILTER_CATEGORY_SUCESS,
    payload: {
      data,
    },
  }),

  getSinglePostRequest: id => ({
    type: Types.GET_POST_REQUEST,
    payload: {
      id,
    },
  }),

  getSinglePostSuccess: selected => ({
    type: Types.GET_POST_SUCCESS,
    payload: {
      selected,
    },
  }),

  getSinglePostFailure: error => ({
    type: Types.GET_POST_FAILURE,
    payload: {
      error,
    },
  }),
  voteRequest: (id, option, updateType, category) => ({
    type: Types.VOTE_REQUEST,
    payload: {
      id,
      option,
      updateType,
      category,
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

  deleteRequest: (id, updateType, category) => ({
    type: Types.DELETE_REQUEST,
    payload: {
      id,
      updateType,
      category,
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
  updatePostRequest: (post, currentList) => ({
    type: Types.UPDATE_REQUEST,
    payload: {
      post,
      currentList
    },
  }),

  updatePostSuccess: () => ({
    type: Types.UPDATE_SUCCESS,
  }),

  updatePostFailure: error => ({
    type: Types.UPDATE_FAILURE,
    payload: {
      error,
    },
  }),
};
