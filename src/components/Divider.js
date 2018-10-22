import uuid from 'uuid/v4';

import { state, renderList } from '../index';
import { getListName } from '../utils';

import '../styles/divider.css';


// props.index represents what the new index of the dropped item should be
const Divider = (props) => {
    const { index } = props;

    const dividerEl = document.createElement('div');
    dividerEl.className = 'divider';

    dividerEl.addEventListener('dragover', e => {
        handleDragOver(e, props);
    });
    dividerEl.addEventListener('dragleave', e => {
        handleDragLeave(e, props);
    });
    dividerEl.addEventListener('drop', e => {
        handleDrop(e, props);
    })
    
    return dividerEl;
}

function handleDragOver(e, props) {
    e.preventDefault();

    e.target.classList.add('divider--over');   
}

function handleDragLeave(e, props) {
    e.target.classList.remove('divider--over');
}

function handleDrop(e, props) {
    e.stopPropagation();
    e.target.classList.remove('divider--over');
    const itemProps = JSON.parse(e.dataTransfer.getData('text/json'));
    const destParentListId = e.target.parentElement.parentElement.id;
    const sourceParentListId = state.dragSourceEl.parentElement.parentElement.id;
    // Insert at new index in destination list and remove old copy from source list
    const newId = uuid();
    state[getListName(destParentListId)].splice(props.index, 0, { ...itemProps, id: newId });
    state[getListName(sourceParentListId)] = state[getListName(sourceParentListId)].filter(({ id }) => id !== itemProps.id);
    
    state.justDroppedItemId = newId;
    // If coming from a different list re render that list too
    if (sourceParentListId !== destParentListId) {
        renderList(sourceParentListId);
    }
    renderList(destParentListId);
}  

export default Divider;