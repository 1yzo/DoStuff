// Modules
import { store, renderList } from '../index';
import { getListKey } from '../utils';
import { startInsertItem } from '../redux/actions/lists';
// Styles
import '../styles/divider.css';


// props.index represents what the new index of the dropped item should be
const Divider = (props) => {
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
    const { index } = JSON.parse(e.dataTransfer.getData('text/json'));
    // If item is coming from same list, make sure it's not an adjacent divider before expanding the divider
    if (store.getState().config.dragSource.parentElement.parentElement === e.target.parentElement.parentElement) {
        if (props.index !== index && props.index != index + 1) {
            e.target.classList.add('divider--over');   
        }
    } else {
        e.target.classList.add('divider--over');   
    }
}

function handleDragLeave(e, props) {
    e.target.classList.remove('divider--over');
}

async function handleDrop(e, props) {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove('divider--over');
    const itemProps = JSON.parse(e.dataTransfer.getData('text/json'));
    const destParentListId = e.target.parentElement.parentElement.id;
    const sourceParentListId = store.getState().config.dragSource.parentElement.parentElement.id;
    // Insert at new index in destination list and remove old copy from source list
    await store.dispatch(startInsertItem(getListKey(sourceParentListId), getListKey(destParentListId), itemProps, props.index));
    // If coming from a different list re render that list too
    if (sourceParentListId !== destParentListId) {
        renderList(sourceParentListId);
    }
    renderList(destParentListId);
}  

export default Divider;