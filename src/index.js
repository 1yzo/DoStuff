import Item from './components/Item';

import './styles/base.css';
import './styles/list.css';

const todoContainer = document.querySelector('.todo-container');
const doingContainer = document.querySelector('.doing-container');
let dragSourceEl = null;

document.querySelector('#todo-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = e.target.children[0];
    const todoText = input.value;
    todoContainer.appendChild(Item(todoText));
    input.value = '';
});

export function handleDragStart(e) {
    dragSourceEl = e.target;
    dragSourceEl.classList.add('item--over');
    e.target.style.opacity = 0.5;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

export function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

export function handleDragEnter(e) {
    e.target.classList.add('item--over');
}

export function handleDragLeave(e) {
    if (e.target !== dragSourceEl) {
        e.target.classList.remove('item--over');
    }
}

export function handleDragEnd(e) {
    e.target.style.opacity = 1;
}

export function handleDrop(e) {
    e.stopPropagation();
    e.target.classList.remove('item--over');
    dragSourceEl.innerHTML = e.target.innerHTML;
    dragSourceEl.classList.remove('item--over');
    e.target.innerHTML = e.dataTransfer.getData('text/html');
    return false;
}

// Container transfers
doingContainer.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
});

doingContainer.addEventListener('drop', e => {
    e.stopPropagation();
    dragSourceEl.remove();
    const itemEl = Item(e.dataTransfer.getData('text/html'));
    e.target.appendChild(itemEl);
    return false;
});
todoContainer.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
});

todoContainer.addEventListener('drop', e => {
    e.stopPropagation();
    dragSourceEl.remove();
    const itemEl = Item(e.dataTransfer.getData('text/html'));
    e.target.appendChild(itemEl);
    return false;
});