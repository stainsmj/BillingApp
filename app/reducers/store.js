import {ADD_ITEM, EDIT_ITEM, DELETE_ITEM} from './types';
const initialState = [
  {
    id: 1,
    title: 'Main dishes',
    data: [
      {
        title: 'Pizza',
        price: 24,
        id: 21,
      },
      {
        title: 'Burger',
        price: 234,
        id: 22,
      },
      {
        title: 'Risotto',
        price: 54,
        id: 23,
      },
    ],
  },
  {
    id: 2,
    title: 'Sub Dishes',
    data: [
      {
        title: 'Pizza',
        price: 24,
        id: 21,
      },
      {
        title: 'Burger',
        price: 234,
        id: 22,
      },
      {
        title: 'Risotto',
        price: 54,
        id: 23,
      },
    ],
  },
  {
    id: 3,
    title: 'Main',
    data: [
      {
        title: 'Pizza',
        price: 24,
        id: 21,
      },
      {
        title: 'Burger',
        price: 234,
        id: 22,
      },
      {
        title: 'Risotto',
        price: 54,
        id: 23,
      },
    ],
  },
  {
    id: 4,
    title: 'dishes',
    data: [
      {
        title: 'Pizza',
        price: 24,
        id: 21,
      },
      {
        title: 'Burger',
        price: 234,
        id: 22,
      },
      {
        title: 'Risotto',
        price: 54,
        id: 23,
      },
    ],
  },
];
const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      let temp = state;
      const index = temp.findIndex((obj) => obj.id === action.section_id);
      if (index === -1) alert('index -1');
      const {title, price, measurement} = action;
      temp[index].data.push({
        title,
        price,
        measurement,
        id: Date.now,
      });
      return temp;

    default:
      return state;
  }
};

export default storeReducer;
