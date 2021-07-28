const { createStore, applyMiddleware } = require('redux');
const logger = require('redux-logger').default;

const BUY_CAKE = 'BUY_CAKE';
const EAT_CAKE = 'EAT_CAKE';

const buyCake = () => ({ type:BUY_CAKE });
const eatCake = () => ({ type:EAT_CAKE });

const initialState = {
  amount: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        amount: state.amount + 1
      }
    case EAT_CAKE:
      return {
        ...state,
        amount: state.amount - 1
      }
    default: return state;
  }
}

const store = createStore(reducer, applyMiddleware(logger));

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(eatCake());