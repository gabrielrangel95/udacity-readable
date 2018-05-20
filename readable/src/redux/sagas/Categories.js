import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { Creators as CategoriesActions } from '../ducks/Categories';

export function* getCategories() {
  try {
    const response = yield call(api.get, '/categories');
    console.log(response.data);
    yield put(CategoriesActions.getCategoriesSuccess(response.data.categories));
  } catch (err) {
    yield put(CategoriesActions.getCategoriesFailure('Error getting data'));
  }
}
