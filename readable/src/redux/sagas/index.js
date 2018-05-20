import { all, takeLatest } from 'redux-saga/effects';

import { Types as CategoriesTypes } from '../ducks/Categories';
import { Types as PostTypes } from '../ducks/Posts';

import { getCategories } from './Categories';
import { getPosts, createPost } from './Posts';

export default function* rootSaga() {
  return yield all([
    takeLatest(CategoriesTypes.GET_REQUEST, getCategories),
    takeLatest(PostTypes.GET_REQUEST, getPosts),
    takeLatest(PostTypes.CREATE_REQUEST, createPost),
  ]);
}
