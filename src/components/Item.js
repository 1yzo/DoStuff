import { state } from '../index';

import '../styles/item.css';

const Item = (text) => {
    const item = document.createElement('div');
    item.className = 'item';
    item.draggable = 'true';
    item.innerHTML = text;

    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('dragend', handleDragEnd, false);
    item.addEventListener('drop', handleDrop, false);

    return item;
};

export function handleDragStart(e) {
    state.dragSourceEl = e.target;
    state.dragSourceEl.classList.add('item--over');
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
    if (e.target !== state.dragSourceEl) {
        e.target.classList.remove('item--over');
    }
}

export function handleDragEnd(e) {
    e.target.style.opacity = 1;
    e.target.classList.remove('item--over');
}

export function handleDrop(e) {
    e.stopPropagation();
    e.target.classList.remove('item--over');
    state.dragSourceEl.innerHTML = e.target.innerHTML;
    state.dragSourceEl.classList.remove('item--over');
    e.target.innerHTML = e.dataTransfer.getData('text/html');
    return false;
}


export default Item;