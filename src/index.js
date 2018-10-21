import Item from './components/Item';
import List from './components/List';

import './styles/base.css';

export const state = {
    dragSourceEl: null
};

const listContainer = document.querySelector('#list-container');
const todoList = List({ id: 'todo-list' });
const doingList = List({ id: 'doing-list' })
listContainer.appendChild(todoList);
listContainer.appendChild(doingList);


document.querySelector('#todo-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = e.target.children[0];
    const todoText = input.value;
    todoList.appendChild(Item(todoText));
    input.value = '';
});