// Modules
import { store, renderList, emit } from '../index';
import { getListKey } from '../utils';
import { startRemoveItem, startPushItem } from '../redux/actions/lists';
// Styles
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

async function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const itemProps = JSON.parse(e.dataTransfer.getData('text/json'));
    const sourceParentListId = store.getState().config.dragSource.parentElement.parentElement.id;
    const destParentListId = e.target.id;
    // Remove from source list and add to destination list
    await store.dispatch(startRemoveItem(getListKey(sourceParentListId), itemProps.index));
    await store.dispatch(startPushItem(getListKey(destParentListId), itemProps));
    // Re-render the involved lists
    await Promise.all([renderList(sourceParentListId), renderList(destParentListId)]);
    emit('update', store.getState().config.justDroppedId);
};

export default List;