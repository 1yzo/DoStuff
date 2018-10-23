import Divider from './Divider';

import { state } from '../index';

import '../styles/item.css';

const Item = (props) => {
    const { text, index, justDropped, color } = props;

    const itemParentEl = document.createElement('div');
    const item = document.createElement('div');
    item.className = 'item';
    justDropped && item.classList.add('item--dropped');
    item.draggable = 'true';
    item.innerHTML = `
        <div class="item__header" style="background-color: ${color}"></div>
        <div class="item__content">${text}</div>
    `;
    
    item.addEventListener('dragstart', e => {
        handleDragStart(e, props);   
    });
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('drop', handleDrop);

    index === 0 && itemParentEl.appendChild(Divider({ index: 0 }));
    itemParentEl.appendChild(item);
    itemParentEl.appendChild(Divider({ index: index + 1 }));

    return itemParentEl;
};

export function handleDragStart(e, props) {
    state.dragSourceEl = e.target;
    state.dragSourceEl.classList.add('item--over');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
    e.dataTransfer.setData('text/json', JSON.stringify(props));
}

export function handleDragEnd(e) {
    e.target.classList.remove('item--over')
    state.dragSourceEl = null;
}

export function handleDrop(e) {
    e.stopPropagation();
    e.target.classList.remove('item--over');
}


export default Item;