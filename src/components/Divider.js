import uuid from 'uuid/v4';

import { state, renderTodoList } from '../index';



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
    // e.dataTransfer.dropEffect = 'move';
    
    e.target.classList.add('divider--over');   
}

function handleDragLeave(e, props) {
    e.target.classList.remove('divider--over');
}

function handleDrop(e, props) {
    e.stopPropagation();
    e.target.classList.remove('divider--over');
    state.dragSourceEl.parentElement.remove();
    const itemProps = JSON.parse(e.dataTransfer.getData('text/json'));
    state.todoListItems.splice(props.index, 0, { ...itemProps, id: uuid() });
    state.todoListItems = state.todoListItems.filter(({ id }) => id !== itemProps.id);
    state.todoListItems = state.todoListItems.map((item, index) => ({
        ...item,
        index
    }));
    renderTodoList();
}  

export default Divider;