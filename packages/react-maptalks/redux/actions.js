import { createAction } from 'redux-actions';

import { ACTION_UPDATE_TIME } from './mutation-types';

export const actionTime = createAction(ACTION_UPDATE_TIME, (...props) => props);
