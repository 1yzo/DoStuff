// Node Modules
import uuid from 'uuid/v4';
// Modules
import { setJustDroppedId } from './config';
import { resolve } from 'url';

export const setList = (listKey, items) => ({
    type: 'SET_LIST',
    listKey,
    items
});
// For adding new items
const unshiftItem = (listKey, newItem) => ({
    type: 'UNSHIFT_ITEM',
    listKey,
    newItem
});
// For dropping items in a list
const pushItem = (listKey, newItem) => ({
    type: 'PUSH_ITEM',
    listKey,
    newItem
});
// For dropping items between other items
const insertItem = (sourceListKey, destListKey, item, newIndex, oldId) => ({
    type: 'INSERT_ITEM',
    sourceListKey,
    destListKey,
    item,
    newIndex,
    oldId
});

const removeItem = (listKey, index) => ({
    type: 'REMOVE_ITEM',
    listKey,
    index
});

export const startUnshiftItem = (listKey, newItem) => dispatch => {
    return new Promise(resolve => {
        const newId = uuid();
        dispatch(setJustDroppedId(newId));
        dispatch(unshiftItem(listKey, {
            ...newItem,
            id: newId
        }));
        resolve();
    });
};

export const startPushItem = (listKey, newItem) => dispatch => new Promise(resolve => {
    const newId = uuid();
    dispatch(setJustDroppedId(newId));
    dispatch(pushItem(listKey, {
        ...newItem,
        id: newId
    }));
    resolve();
});

export const startInsertItem = (sourceListKey, destListKey, item, newIndex) => dispatch => new Promise(resolve => {
    const oldId = item.id;
    const newId = uuid();
    dispatch(setJustDroppedId(newId));
    dispatch(insertItem(sourceListKey, destListKey, { ...item, id: newId }, newIndex, oldId));
    resolve();
});

export const startRemoveItem = (listKey, index) => dispatch => new Promise(resolve => {
    dispatch(removeItem(listKey, index));
    resolve();
});