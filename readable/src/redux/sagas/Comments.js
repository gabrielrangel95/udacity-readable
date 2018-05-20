import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { Creators as CommentsActions } from '../ducks/Comments';

export function* getComments(action) {
  try {
    const { id } = action.payload;
    const response = yield call(api.get, `/posts/${id}/comments`);
    console.log(response.data);
    yield put(CommentsActions.getCommentsSuccess(response.data));
  } catch (err) {
    yield put(CommentsActions.getCommentsFailure('Error getting comments'));
  }
}
