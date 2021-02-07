import {createStore,applyMiddleware} from 'redux';
import taskTimer from './reducers'
import thunk from 'redux-thunk'
const store  = createStore(taskTimer,applyMiddleware(thunk));

export default store;