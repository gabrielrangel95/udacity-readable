import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { Creators as CategoriesActions } from '../ducks/Categories';

export function* categoriesRequest() {
  try {
    const response = yield call(api.get, '/categories', Headers);
    console.log(response.data);
    yield put(CategoriesActions.categoriesSuccess(response.data));
  } catch (err) {
    yield put(CategoriesActions.categoriesError('Error'));
  }
}
