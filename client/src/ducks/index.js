import { combineReducers } from 'redux';
import user from './User';
import clickAnalyze from './ClickAnalyze';

export default combineReducers({
    user,
    clickAnalyze
});