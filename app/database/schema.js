import Realm from 'realm';

const ITEM_SCHEMA_NAME = 'ITEM',
  CATAGORY_SCHEMA_NAME = 'CATAGORY';

export const ItemScheme = {
  name: ITEM_SCHEMA_NAME,
  primaryKey: 'id',
  properties: {
    id: 'int', //primary key
    title: {type: 'string', indexed: true},
    image: {type: 'string', default: 'no image'},
    price: {type: 'int'},
    measurementIn: {type: 'string', default: 'kg'}, //kg,g,l
  },
};

export const CatagorySchema = {
  name: CATAGORY_SCHEMA_NAME,
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    data: {type: 'list', objectType: ITEM_SCHEMA_NAME},
  },
};

const DATABASE_OPTIONS = {
  path: 'billingAppSchema.realm',
  schema: [ItemScheme, CatagorySchema],
};

//functions for catagories::::
export const insertNewCatagory = (newCatagoryDetails) =>
  new Promise((resolve, reject) => {
    console.log('TRYING TO INSERT CATAGORY...');
    Realm.open(DATABASE_OPTIONS)
      .then((realm) => {
        console.log('DATABASE OPEN...');
        realm.write(() => {
          console.log('WRITING CATAGORY...');
          realm.create(CATAGORY_SCHEMA_NAME, newCatagoryDetails);
          console.log('SUCCESSFUL.');
          resolve(newCatagoryDetails);
        });
      })
      .catch((err) => {
        console.warn('CANNOT OPEN DB');
        reject(error);
      });
  });

export const queryAllCatagory = () =>
  new Promise((resolve, reject) => {
    console.log('OPENING REALM...');
    Realm.open(DATABASE_OPTIONS)
      .then((realm) => {
        console.log('GETTING CATAGORIES...');
        const allCatagory = realm.objects(CATAGORY_SCHEMA_NAME);
        resolve(allCatagory);
        console.log('SUCCESS', allCatagory);
      })
      .catch((err) => {
        console.warn('ERROR OPENING REALM');
        reject(err);
      });
  });

//functions for items
export const insertNewItem = (newItemDetails, sectionId) =>
  new Promise((resolve, reject) => {
    console.log('TRYING TO INSERT ITEM...');
    Realm.open(DATABASE_OPTIONS)
      .then((realm) => {
        console.log('DATABASE OPEN...');
        const desiredSection = realm.objectForPrimaryKey(
          CATAGORY_SCHEMA_NAME,
          sectionId,
        );
        realm.write(() => {
          console.log('WRITING ITEM...');
          desiredSection.data.push(newItemDetails);
          console.log('SUCCESSFUL.');
          resolve(newItemDetails);
        });
      })
      .catch((err) => {
        console.warn('CANNOT OPEN DB');
        reject(err);
      });
  });

//DELETE A ITEM
export const deleteItem = (itemId) =>
  new Promise((resolve, reject) => {
    Realm.open(DATABASE_OPTIONS)
      .then((realm) => {
        const desiredItem = realm.objectForPrimaryKey(ITEM_SCHEMA_NAME, itemId);
        console.log(desiredItem);
        realm.write(() => {
          console.log('DELETING ITEM...');
          realm.delete(desiredItem);
          console.log('SUCCESSFUL.');
          resolve(desiredItem);
        });
      })
      .catch((err) => {
        console.log('DB OPEN ERROR');
        reject(err);
      });
  });
export default new Realm(DATABASE_OPTIONS);
