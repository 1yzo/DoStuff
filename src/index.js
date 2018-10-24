// Node Modules
import uuid from 'uuid/v4';
// Components
import Item from './components/Item';
import List from './components/List';
import AddItemModal from './components/AddItemModal';
// Modules
import { getListKey, fadeIn } from './utils';
import configureStore from './redux/configureStore';
import { setList } from './redux/actions/lists';
// Styles
import './styles/base.css';
import './styles/header.css';
import './styles/modal.css';
import './styles/inputs.css';

export const store = configureStore();

const listContainer = document.querySelector('#list-container');
listContainer.appendChild(List({ id: 'todo-list', title: 'Stuff Todo' }));
listContainer.appendChild(List({ id: 'doing-list', title: "Stuff I'm Doing" }));
listContainer.appendChild(List({ id: 'done-list', title: 'Stuff I Did'}));

// Use localStorage for now
const savedItems = JSON.parse(localStorage.getItem('items'));
if (savedItems) {
    const todoList = savedItems.map(({ itemText, index }) => ({
        id: uuid(),
        text: itemText,
        index,
        color: '#42526E'
    }));
    store.dispatch(setList('todo', todoList));
}

const actualTodoList = document.querySelector('#todo-list');
store.getState().lists.todo.forEach(item => {
    actualTodoList.appendChild(Item(item));
});

export function renderList(listId) {
    const list = document.querySelector(`#${listId}`);
    list.innerHTML = null;
    store.getState().lists[getListKey(listId)].forEach(item => {
        list.appendChild(Item({
            ...item,
            justDropped: item.id === store.getState().config.justDroppedId,
        }));
    });
}

// Popup modal for adding new items

const addButtonEl = document.querySelector('.add-button');
addButtonEl.addEventListener('click', () => {
    const modal = document.body.appendChild(AddItemModal());
    fadeIn(modal, 200);
    document.querySelector('#add-input').focus();
    document.querySelectorAll('.color-picker')[0].click();
});
