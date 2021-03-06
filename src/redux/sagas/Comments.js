import { call, put } from 'redux-saga/effects';
import sortBy from 'sort-by';
import api from '../../services/api';
import { Creators as CommentsActions } from '../ducks/Comments';
import { Creators as PostActions } from '../ducks/Posts';

const uuidv1 = require('uuid/v1');

export function* getComments(action) {
  try {
    const { id } = action.payload;
    const response = yield call(api.get, `/posts/${id}/comments`);
    const comments = response.data.sort(sortBy('-voteScore'));
    yield put(CommentsActions.getCommentsSuccess(comments));
    yield put(PostActions.getSinglePostRequest(id));
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

export function* deleteComment(action) {
  try {
    const { commentId, parentId } = action.payload;
    console.log(action.payload);
    const response = yield call(api.delete, `/comments/${commentId}`);
    console.log(response);
    yield put(CommentsActions.getCommentsRequest(parentId));
    yield put(CommentsActions.deleteSuccess());
  } catch (err) {
    yield put(CommentsActions.deleteFailure('Error on delete comment'));
  }
}

export function* updateComment(action) {
  try {
    const { id, body, parentId } = action.payload.comment;
    yield call(api.put, `/comments/${id}`, {
      body,
      timestamp: Date.now(),
    });
    yield put(CommentsActions.updateSuccess());
    yield put(CommentsActions.getCommentsRequest(parentId));
  } catch (err) {
    yield put(CommentsActions.updateFailure('Error on update comment'));
  }
}

export function* setCommentSelected(action){
  try{
    const { selected } = action.payload;
    yield put(CommentsActions.selectedSuccess(selected));
  }catch(error){
    yield put(CommentsActions.selectedFailure(error));
  }
}
