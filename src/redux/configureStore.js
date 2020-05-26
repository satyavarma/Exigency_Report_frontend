import {createStore, combineReducers, applyMiddleware } from 'redux';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
        })
    );

    return store;
}

