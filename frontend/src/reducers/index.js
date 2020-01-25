import { combineReducers } from 'redux';

import {tokenReducer, userIdReducer, userReducer} from './auth';

const allReducers = combineReducers({
    token: tokenReducer,
    userId: userIdReducer,
    user: userReducer
});

export default allReducers;

