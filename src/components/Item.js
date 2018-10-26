// Components
import Divider from './Divider';
// Modules
import { store } from '../index';
import { setDragSource } from '../redux/actions/config';
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

function handleDragStart(e, props) {
    e.target.classList.add('item--over');
    store.dispatch(setDragSource(e.target));
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/json', JSON.stringify(props));
}

function handleDragEnd(e) {
    e.target.classList.remove('item--over');
    store.dispatch(setDragSource(null));
}

function handleDrop(e) {
    e.stopPropagation();
    e.target.classList.remove('item--over');
}


export default Item;