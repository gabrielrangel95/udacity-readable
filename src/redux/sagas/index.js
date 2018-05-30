import { all, takeLatest } from 'redux-saga/effects';

import { Types as CategoriesTypes } from '../ducks/Categories';
import { Types as PostTypes } from '../ducks/Posts';
import { Types as CommentsTypes } from '../ducks/Comments';

import { getCategories } from './Categories';
import { getPosts, createPost, sortPosts, filterCategory, getSinglePost, votePost, deletePost, updatePost } from './Posts';
import { getComments, createComment, voteComment, deleteComment, updateComment, setCommentSelected } from './Comments';

export default function* rootSaga() {
  return yield all([
    takeLatest(CategoriesTypes.GET_REQUEST, getCategories),
    takeLatest(PostTypes.GET_REQUEST, getPosts),
    takeLatest(PostTypes.CREATE_REQUEST, createPost),
    takeLatest(PostTypes.SORT_REQUEST, sortPosts),
    takeLatest(PostTypes.FILTER_CATEGORY_REQUEST, filterCategory),
    takeLatest(PostTypes.GET_POST_REQUEST, getSinglePost),
    takeLatest(PostTypes.VOTE_REQUEST, votePost),
    takeLatest(PostTypes.DELETE_REQUEST, deletePost),
    takeLatest(PostTypes.UPDATE_REQUEST, updatePost),
    takeLatest(CommentsTypes.GET_REQUEST, getComments),
    takeLatest(CommentsTypes.CREATE_REQUEST, createComment),
    takeLatest(CommentsTypes.VOTE_REQUEST, voteComment),
    takeLatest(CommentsTypes.DELETE_REQUEST, deleteComment),
    takeLatest(CommentsTypes.UPDATE_REQUEST, updateComment),
    takeLatest(CommentsTypes.SELECT_REQUEST, setCommentSelected),
  ]);
}
