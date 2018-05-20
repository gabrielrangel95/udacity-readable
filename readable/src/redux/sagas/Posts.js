import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { Creators as PostsActions } from '../ducks/Posts';

const uuidv1 = require('uuid/v1');

export function* getPosts() {
  try {
    const response = yield call(api.get, '/posts');
    console.log(response.data);
    yield put(PostsActions.getPostsSuccess(response.data));
  } catch (err) {
    yield put(PostsActions.getPostsFailure('Erro getting Posts'));
  }
}

export function* createPost(action) {
  try {
    const response = yield call(api.post, '/posts', {
      author: action.payload.post.author,
      body: action.payload.post.body,
      category: action.payload.post.category,
      title: action.payload.post.title,
      timestamp: Date.now(),
      id: uuidv1(),
    });
    console.log(response.data);
    yield put(PostsActions.createPostSuccess());
    yield put(PostsActions.getPostsRequest());
  } catch (err) {
    yield put(PostsActions.createPostFailure('Error on create Post'));
  }
}
