import Item from './Item';

import { state } from '../index';

import '../styles/list.css';


const List = (props) => {
    const listParentEl = document.createElement('div');
    listParentEl.className = 'list-parent';

    const titleEl = document.createElement('div');
    titleEl.className = 'list__title';
    titleEl.innerHTML = props.title;
    listParentEl.appendChild(titleEl);

    const listEl = document.createElement('div');
    listEl.id = props.id;
    listEl.className = 'list';
    listParentEl.appendChild(listEl);

    listEl.addEventListener('dragover', handleDragOver, false);
    listEl.addEventListener('drop', handleDrop, false);

    return listParentEl;
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
    // e.target.appendChild(itemEl);
    e.target.appendChild(itemEl);
    return false;
};

export default List;