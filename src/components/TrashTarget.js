// Modules
import { store, emit } from '../index';
import { startRemoveItem } from '../redux/actions/lists';
import { getListKey } from '../utils';
import { renderList } from '../index';
// Styles
import '../styles/options.css';

const TrashTarget = () => {
    const trashTargetEL = document.createElement('i');
    trashTargetEL.className = 'fas fa-trash option option--trash';
    
    trashTargetEL.addEventListener('dragover', handleDragOver);
    trashTargetEL.addEventListener('dragleave', handleDragLeave);
    trashTargetEL.addEventListener('drop', handleDrop);

    return trashTargetEL;
};

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.target.classList.add('option--trash--over');
}

function handleDragLeave(e) {
    e.target.classList.remove('option--trash--over');
}

async function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const droppedItem = JSON.parse(e.dataTransfer.getData('text/json'));
    const sourceListId = store.getState().config.dragSource.parentElement.parentElement.id;

    await store.dispatch(startRemoveItem(getListKey(sourceListId), droppedItem.index));
    renderList(sourceListId)
        .then(() => emit('update'));
}

export default TrashTarget;