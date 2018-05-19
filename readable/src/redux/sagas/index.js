import { all, takeLatest } from 'redux-saga/effects';
import { Types as CategoriesTypes } from '../ducks/Categories';
import { getCategories } from './Categories';

export default function* rootSaga() {
  return yield all([
    takeLatest(CategoriesTypes.GET_REQUEST, getCategories),
  ]);
}
