import { handleActions } from 'redux-actions';
import { ACTION_UPDATE_TIME } from './mutation-types';

const timer = handleActions({
  [ACTION_UPDATE_TIME]: (state, action) => {
    console.log(action);
    return Object.assign({}, state, action.payload)
  }
}, {
  time: '',
});

export default {
  timer,
}
