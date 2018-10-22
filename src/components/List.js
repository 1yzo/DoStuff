import { state, renderList } from '../index';
import { getListName } from '../utils';

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
    const itemProps = JSON.parse(e.dataTransfer.getData('text/json'));
    const sourceParentListId = state.dragSourceEl.parentElement.parentElement.id;
    const destParentListId = e.target.id;
    // Remove from source list and add to destination list
    state[getListName(sourceParentListId)].splice(itemProps.index, 1);
    state[getListName(destParentListId)].push({ ...itemProps });
    // Re-render the involved lists
    renderList(sourceParentListId);
    renderList(destParentListId);
};

export default List;