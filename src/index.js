import Item from './components/Item';
import List from './components/List';

import './styles/base.css';
import './styles/header.css';

export const state = {
    dragSourceEl: null
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
    const actualTodoList = document.querySelector('#todo-list');
    savedItems.forEach((itemText) => {
        actualTodoList.appendChild(Item(itemText));
    });
}