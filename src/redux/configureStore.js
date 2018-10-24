import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import listsReducer from './reducers/lists';
import configReducer from './reducers/config';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            lists: listsReducer,
            config: configReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};