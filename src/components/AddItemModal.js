import uuid from 'uuid/v4';

import ColorPickerSingle from './ColorPickerSingle';

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

    const modalContent = document.createElement('form');
    modalContent.className = 'modal-content';
    modalContent.addEventListener('submit', e => {
        e.preventDefault();
        if (addInput.value.trim()) {
            const newItemId = uuid();
            state.justDroppedItemId = newItemId;
            const newItemProps = {
                id: newItemId,
                text: addInput.value,
                color: state.newItemColor
            };
            state.todoListItems.unshift(newItemProps);
            renderList('todo-list');
            modal.classList.add('modal-mask--hide');
        }
    });

    const addInput = document.createElement('input');
    addInput.id = 'add-input';
    addInput.className = 'add-input';
    addInput.type = 'text';
    addInput.autocomplete = 'off';

    const colorPicker = document.createElement('div');
    colorPicker.className = 'color-picker-container';
    colorPicker.appendChild(ColorPickerSingle('#42526E'));
    colorPicker.appendChild(ColorPickerSingle('#FFAB00'));
    colorPicker.appendChild(ColorPickerSingle('#FF5630'));
    colorPicker.appendChild(ColorPickerSingle('#36B37E'));
    colorPicker.appendChild(ColorPickerSingle('#0052CC'));

    const createButton = document.createElement('button');
    createButton.className = 'create-button';
    createButton.innerHTML = 'Create Task';

    modalContent.appendChild(addInput);
    modalContent.appendChild(colorPicker);
    modalContent.appendChild(createButton);

    modal.appendChild(modalContent);
    
    return modal;
}

export default AddItemModal;