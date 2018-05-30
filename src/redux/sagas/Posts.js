import { call, put, select } from 'redux-saga/effects';
import sortBy from 'sort-by';
import api from '../../services/api';
import { Creators as PostsActions } from '../ducks/Posts';

const uuidv1 = require('uuid/v1');

export const getCurrentPosts = state => state.posts;

export function* getPosts() {
  try {
    const response = yield call(api.get, '/posts');
    const posts = response.data.sort(sortBy('-voteScore'));
    yield put(PostsActions.getPostsSuccess(posts));
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

export function* sortPosts(action) {
  try {
    let newPosts = null;
    const posts = yield select(getCurrentPosts);
    const filter = action.payload.type;
    if (filter === 'marvel') {
      newPosts = posts.data.filter(post => post.path === 'marvel');
    } else if (filter === 'dc') {
      newPosts = posts.data.filter(post => post.path === 'dc');
    } else if (filter === 'discussion') {
      newPosts = posts.data.filter(post => post.path === 'discussion');
    } else {
      newPosts = posts.data.sort(sortBy(`-${filter}`));
    }

    yield put(PostsActions.sortPostSucess(newPosts));
  } catch (err) {
    yield put(PostsActions.getPostsFailure('Error on sorting Post'));
  }
}

export function* filterCategory(action) {
  try {
    const { category } = action.payload;
    const response = yield call(api.get, `${category}/posts`);
    const posts = response.data.sort(sortBy('-voteScore'));
    yield put(PostsActions.filterCategorySucess(posts));
  } catch (err) {
    yield put(PostsActions.getPostsFailure('Error on filtering Posts'));
  }
}

export function* getSinglePost(action) {
  try {
    const { id } = action.payload;
    const response = yield call(api.get, `/posts/${id}`);
    yield put(PostsActions.getSinglePostSuccess(response.data));
  } catch (err) {
    yield put(PostsActions.getSinglePostFailure('Error on getting Post'));
  }
}

export function* votePost(action) {
  try {
    const {
      id, option, updateType, category,
    } = action.payload;

    yield call(api.post, `/posts/${id}`, { option });
    yield put(PostsActions.voteSuccess());
    if (updateType === 'allPosts') {
      yield put(PostsActions.getPostsRequest());
    } else if (updateType === 'category') {
      yield put(PostsActions.filterCategoryRequest(category));
    } else if (updateType === 'single') {
      yield put(PostsActions.getSinglePostRequest(id));
    }
  } catch (err) {
    yield put(PostsActions.voteFailure('Error on voting Post'));
  }
}

export function* deletePost(action) {
  try {
    const { id, updateType, category } = action.payload;
    yield call(api.delete, `/posts/${id}`);
    yield put(PostsActions.deleteSuccess());
    if (updateType === 'category') {
      yield put(PostsActions.filterCategoryRequest(category));
    } else if (updateType === 'allPosts') {
      yield put(PostsActions.getPostsRequest(id));
    }
  } catch (err) {
    yield put(PostsActions.deleteFailure('Error on deleting Post'));
  }
}

export function* updatePost(action) {
  try {
    const {
      id, title, body, category,
    } = action.payload.post;
    yield call(api.put, `/posts/${id}`, {
      body,
      title,
    });
    yield put(PostsActions.createPostSuccess());
    yield put(PostsActions.filterCategoryRequest(category));
    yield put(PostsActions.getPostsRequest());
  } catch (err) {
    yield put(PostsActions.createPostFailure('Error on create Post'));
  }
}
