import { combineReducers } from 'redux';
import categories from './Categories';
import posts from './Posts';

export default combineReducers({
  categories,
  posts,
});
