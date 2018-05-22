import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { Creators as CommentsActions } from '../ducks/Comments';

const uuidv1 = require('uuid/v1');

export function* getComments(action) {
  try {
    const { id } = action.payload;
    const response = yield call(api.get, `/posts/${id}/comments`);
    yield put(CommentsActions.getCommentsSuccess(response.data));
  } catch (err) {
    yield put(CommentsActions.getCommentsFailure('Error getting comments'));
  }
}

export function* createComment(action) {
  try {
    yield call(api.post, '/comments', {
      author: action.payload.comment.author,
      body: action.payload.comment.body,
      parentId: action.payload.comment.parentId,
      timestamp: Date.now(),
      id: uuidv1(),
    });
    yield put(CommentsActions.createSuccess());
    yield put(CommentsActions.getCommentsRequest(action.payload.comment.parentId));
  } catch (err) {
    yield put(CommentsActions.createFailure('Error on create Comment'));
  }
}

export function* voteComment(action) {
  try {
    const { id, option, parentId } = action.payload;
    yield call(api.post, `comments/${id}`, {
      option,
    });
    yield put(CommentsActions.voteSuccess());
    yield put(CommentsActions.getCommentsRequest(parentId));
  } catch (err) {
    yield put(CommentsActions.createFailure('Error on create Comment'));
  }
}
