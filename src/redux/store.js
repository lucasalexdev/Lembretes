import { createStore, combineReducers } from 'redux';
import remindersReducer from './reducers/reminders';

// Combinação dos reducers
const rootReducer = combineReducers({
  reminders: remindersReducer,
});

// Criação da store com o rootReducer combinado
const store = createStore(rootReducer);


export default store;