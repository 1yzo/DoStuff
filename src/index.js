import uuid from 'uuid/v4';

import Item from './components/Item';
import List from './components/List';
import AddItemModal from './components/AddItemModal';

import { getListName } from './utils';

import './styles/base.css';
import './styles/header.css';
import './styles/modal.css';

export const state = {
    dragSourceEl: null,
    justDroppedItemId: null,
    todoListItems: [],
    doingListItems: [],
    doneListItems: []
};

const listContainer = document.querySelector('#list-container');
listContainer.appendChild(List({ id: 'todo-list', title: 'Stuff Todo' }));
listContainer.appendChild(List({ id: 'doing-list', title: "Stuff I'm Doing" }));
listContainer.appendChild(List({ id: 'done-list', title: 'Stuff I Did'}));

// Use localStorage for now
const savedItems = JSON.parse(localStorage.getItem('items'));
if (savedItems) {
    savedItems.forEach(({ itemText, index }) => {
        state.todoListItems.push({
            id: uuid(),
            text: itemText,
            index
        });
    })
}

const actualTodoList = document.querySelector('#todo-list');
state.todoListItems.forEach(item => {
    actualTodoList.appendChild(Item(item));
});

export function renderList(listId) {
    const list = document.querySelector(`#${listId}`);
    list.innerHTML = null;
    state[getListName(listId)].forEach((item, index) => {
        list.appendChild(Item({
            ...item,
            index,
            justDropped: item.id === state.justDroppedItemId
        }));
    });
}

// Adding new items
const addButtonEl = document.querySelector('.add-button');
addButtonEl.addEventListener('click', e => {
    document.body.appendChild(AddItemModal());
});
