import { all, takeLatest } from 'redux-saga/effects';
import { Types as CategoriesTypes } from '../ducks/Categories';
import { categoriesRequest } from './Categories';

export default function* rootSaga() {
  return yield all([
    takeLatest(CategoriesTypes.CATEGORIES_REQUEST, categoriesRequest),
  ]);
}
