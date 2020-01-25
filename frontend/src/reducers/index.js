import { combineReducers } from 'redux';

import { tokenReducer, userIdReducer, userReducer } from './auth';
import { characterReducer, charactersListReducer } from './character';

const allReducers = combineReducers({
    token: tokenReducer,
    userId: userIdReducer,
    user: userReducer,
    character: characterReducer,
    charactersList: charactersListReducer
});

export default allReducers;

