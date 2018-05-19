import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { Creators as PostsActions } from '../ducks/Posts';

export function* getPosts() {
  try {
    const response = yield call(api.get, '/posts');
    console.log(response.data);
    yield put(PostsActions.getPostsSuccess(response.data));
  } catch (err) {
    yield put(PostsActions.getPostsFailure('Erro ao buscar dados da API'));
  }
}
