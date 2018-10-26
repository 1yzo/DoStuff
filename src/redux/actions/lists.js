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
const insertItem = (sourceListKey, destListKey, item, newIndex) => ({
    type: 'INSERT_ITEM',
    sourceListKey,
    destListKey,
    item,
    newIndex,
});

const removeItem = (listKey, index) => ({
    type: 'REMOVE_ITEM',
    listKey,
    index
});

export const startUnshiftItem = (listKey, newItem) => dispatch => {
    return new Promise(resolve => {
        dispatch(setJustDroppedId(newItem.id));
        dispatch(unshiftItem(listKey, newItem));
        resolve();
    });
};

export const startPushItem = (listKey, newItem) => dispatch => new Promise(resolve => {
    dispatch(setJustDroppedId(newItem.id));
    dispatch(pushItem(listKey, newItem));
    resolve();
});

export const startInsertItem = (sourceListKey, destListKey, item, newIndex) => (dispatch, getState) => new Promise(resolve => {
    dispatch(setJustDroppedId(item.id));
    dispatch(setList(sourceListKey, getState().lists[sourceListKey].map((currItem, index) => {
        if (currItem.id === item.id) {
            return {
                ...currItem,
                index,
                old: true
            };
        } else {
            return {
                ...currItem,
                index
            };
        }
    })));
    dispatch(insertItem(sourceListKey, destListKey, item, newIndex));
    resolve();
});

export const startRemoveItem = (listKey, index) => dispatch => new Promise(resolve => {
    dispatch(removeItem(listKey, index));
    resolve();
});