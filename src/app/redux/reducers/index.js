import { combineReducers } from 'redux';
import ExampleReducer from './example_reducer';

const appReducer = combineReducers({
  example: ExampleReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'reset') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
