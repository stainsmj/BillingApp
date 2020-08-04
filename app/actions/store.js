import {ADD_ITEM, EDIT_ITEM, DELETE_ITEM} from '../reducers/types';

export const AddItem = (item, section_id) => ({
  type: ADD_ITEM,
  item,
  section_id,
});

export const EditItem = (item, section_id) => ({
  type: EDIT_ITEM,
  item,
  section_id,
});
export const DeleteItem = (id, section_id) => ({
  type: DELETE_ITEM,
  id,
  section_id,
});
