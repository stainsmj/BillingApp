import {ADD_ITEM, EDIT_ITEM, DELETE_ITEM} from './types';
const initialState = [
  {
    title: 'Frozen String',
    amount: 14,
    measurementIn: 'kg',
    price: 23,
  },
  {
    title: 'Tomato',
    amount: 100,
    measurementIn: 'kg',
    price: 34,
  },
];

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, {...action.item}];

    default:
      return state;
  }
};

export default storeReducer;
