// Components
import Divider from './Divider';
import TrashTarget from './TrashTarget';
import ItemModal from './ItemModal';
// Modules
import { store } from '../index';
import { setDragSource } from '../redux/actions/config';
import { fadeIn, fadeOut, getListKey } from '../utils';
// Styles
import '../styles/item.css';

const Item = (props) => {
    const { title, index, justDropped, color } = props;

    const itemParentEl = document.createElement('div');
    const item = document.createElement('div');
    item.className = 'item';
    justDropped && item.classList.add('item--dropped');
    item.draggable = 'true';
    item.innerHTML = `
        <div class="item__header" style="background-color: ${color}"></div>
        <div class="item__content">${title}</div>
    `;
    
    item.addEventListener('dragstart', e => handleDragStart(e, props)); 
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('click', e => handleClick(e, props));

    index === 0 && itemParentEl.appendChild(Divider({ index: 0 }));
    itemParentEl.appendChild(item);
    itemParentEl.appendChild(Divider({ index: index + 1 }));

    return itemParentEl;
};

function handleClick(e, props) {
    const itemModalEl = ItemModal({
        item: props,
        parentListId: e.target.parentElement.parentElement.id
    });
    document.body.appendChild(itemModalEl);
    fadeIn(itemModalEl, 200);
    itemModalEl.style.display = 'initial';
}

function handleDragStart(e, props) {
    e.target.classList.add('item--over');
    store.dispatch(setDragSource(e.target));
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/json', JSON.stringify(props));
    // Show remove item option
    const trashTargetEl = TrashTarget();
    document.querySelector('#trash-option-container').appendChild(trashTargetEl);
    fadeIn(trashTargetEl, 200);
}

function handleDragEnd(e) {
    e.target.classList.remove('item--over');
    store.dispatch(setDragSource(null));
    // Hide remove item option
    const trashTargetEl = document.querySelector('.option--trash');
    fadeOut(trashTargetEl, 200);
}

function handleDrop(e) {
    e.stopPropagation();
    e.target.classList.remove('item--over');
}


export default Item;