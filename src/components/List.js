import Item from './Item';

import { state } from '../index';

import '../styles/list.css';


const List = (props) => {
    const listEl = document.createElement('div');
    listEl.className = 'list';
    listEl.id = props.id;

    listEl.addEventListener('dragover', handleDragOver, false);
    listEl.addEventListener('drop', handleDrop, false);

    return listEl;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
};

function handleDrop(e) {
    e.stopPropagation();
    state.dragSourceEl.remove();
    const itemEl = Item(e.dataTransfer.getData('text/html'));
    e.target.appendChild(itemEl);
    return false;
};

export default List;