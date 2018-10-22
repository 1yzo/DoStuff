import uuid from 'uuid/v4';

import Item from './components/Item';
import List from './components/List';


import './styles/base.css';
import './styles/header.css';

export const state = {
    dragSourceEl: null,
    todoListItems: []
};

const listContainer = document.querySelector('#list-container');
const todoList = List({ id: 'todo-list', title: 'Stuff Todo' });
const doingList = List({ id: 'doing-list', title: "Stuff I'm Doing" });
const doneList = List({ id: 'done-list', title: 'Stuff I Did'});
listContainer.appendChild(todoList);
listContainer.appendChild(doingList);
listContainer.appendChild(doneList);

// Use localStorage for now
const savedItems = JSON.parse(localStorage.getItem('items'));
if (savedItems) {
    savedItems.forEach(({ itemText, index }) => {
        state.todoListItems.push({
            text: itemText,
            index,
            id: uuid()
        });
    })
}

const actualTodoList = document.querySelector('#todo-list');
state.todoListItems.forEach(item => {
    actualTodoList.appendChild(Item(item));
});

export function renderTodoList() {
    actualTodoList.innerHTML = null;
    state.todoListItems.forEach(item => {
        actualTodoList.appendChild(Item(item));
    });
}