import uuid from 'uuid/v4';

import { state, renderList } from '../index';

const AddItemModal = () => {
    const modal = document.createElement('div');
    modal.id = 'add-modal';
    modal.className = 'modal-mask';
    modal.addEventListener('click', e => {
        if (e.target.className === 'modal-mask') {
            modal.classList.add('modal-mask--hide');
        }
    });
    modal.addEventListener('transitionend', e => {
        e.target.id === 'add-modal' && modal.remove();
    });

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const addInput = document.createElement('input');
    addInput.id = 'add-input';
    addInput.className = 'add-input';
    addInput.type = 'text';

    const createButton = document.createElement('button');
    createButton.className = 'create-button';
    createButton.innerHTML = 'Create';
    createButton.addEventListener('click', () => {
        const newItemId = uuid();
        state.justDroppedItemId = newItemId;
        const newItemProps = {
            id: newItemId,
            text: addInput.value
        };
        state.todoListItems.unshift(newItemProps);
        renderList('todo-list');
        modal.classList.add('modal-mask--hide');
    });

    modalContent.appendChild(addInput);
    modalContent.appendChild(createButton);
    modal.appendChild(modalContent);
    
    return modal;
}

export default AddItemModal;