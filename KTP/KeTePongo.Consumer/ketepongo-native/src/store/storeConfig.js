import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../store';

const storeConfig = (preloadedState) => {
  const middleware = [thunk];
  const middlewareEnhancer = applyMiddleware(...middleware);
  const storeEnhancer = [middlewareEnhancer];
  const composedEnhancer = composeWithDevTools(...storeEnhancer);
  const store = createStore(rootReducer, preloadedState, composedEnhancer);

  return store;
};

export default storeConfig;