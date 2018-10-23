import uuid from 'uuid/v4';

import Item from './components/Item';
import List from './components/List';
import AddItemModal from './components/AddItemModal';

import { getListName } from './utils';

import './styles/base.css';
import './styles/header.css';
import './styles/modal.css';
import './styles/inputs.css';

export const state = {
    dragSourceEl: null,
    justDroppedItemId: null,
    newItemColor: null,
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
            index,
            color: '#42526E'
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
            justDropped: item.id === state.justDroppedItemId,
        }));
    });
}

// Popup modal for adding new items
const addButtonEl = document.querySelector('.add-button');
addButtonEl.addEventListener('click', () => {
    document.body.appendChild(AddItemModal());
    document.querySelector('#add-input').focus();
    document.querySelectorAll('.color-picker')[0].click();
});
