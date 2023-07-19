import { applyMiddleware, compose, createStore as createReduxStore, Middleware, Reducer, Store, StoreEnhancer } from 'redux';
import { StateType } from 'typesafe-actions';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { IStateStore, rootReducer } from './root.reducer';
import { rootSaga } from './root.saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export type RootState = StateType<Reducer<IStateStore>>;

export const history = createBrowserHistory();

const getComposer = (): (<R>(a: R) => R) => {
    // tslint:disable-next-line: strict-type-predicates
    if (window !== undefined && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
    return compose;
};

const getMiddlewareEnhancer = (...middleware: Middleware[]): StoreEnhancer => {
    if (process.env.NODE_ENV !== 'production') {
        return applyMiddleware(...middleware, createLogger({ collapsed: true }));
    }
    return applyMiddleware(...middleware);
};

const composeEnhancers = getComposer();
const sagaMiddleware = createSagaMiddleware();
const middlewareEnhancer = getMiddlewareEnhancer(routerMiddleware(history), sagaMiddleware);

const store: Store<RootState> = createReduxStore(rootReducer(), composeEnhancers(middlewareEnhancer));

sagaMiddleware.run(rootSaga);

export { store };
