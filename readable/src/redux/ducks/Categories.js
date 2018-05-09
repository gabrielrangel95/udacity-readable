export const Types = {
  CATEGORIES_REQUEST: 'categories/CATEGORIES_REQUEST',
  CATEGORIES_SUCCESS: 'categories/CATEGORIES_SUCCESS',
  CATEGORIES_FAILURE: 'categories/CATEGORIES_FAILURE',
};

const initialState = {
  categories: [],
  loading: false,
  errorOnGet: null,
};

export default function categories(state = initialState, action) { // reducer
  switch (action.type) {
    case Types.CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case Types.CATEGORIES_SUCCESS:
      return {
        categories: action.payload.categories,
        loading: false,
        errorOnGet: null,
      };
    case Types.CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorOnGet: action.payload.errorMessage,
      };
    default:
      return state;
  }
}

export const Creators = { // actions
  categoriesRequest: () => ({
    type: Types.CATEGORIES_REQUEST,
  }),
  categoriesSuccess: () => ({
    type: Types.CATEGORIES_SUCCESS,
    payload: {
      categories,
    },
  }),
  categoriesError: (message = 'Error loading feed') => ({
    type: Types.CATEGORIES_FAILURE,
    payload: {
      message,
    },
  }),

};

