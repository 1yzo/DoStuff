// Components
import ColorPickerSingle from './ColorPickerSingle';
// Modules
import { store, renderList } from '../index';
import { startUnshiftItem } from '../redux/actions/lists';
import { fadeOut } from '../utils';

const AddItemModal = () => {
    const modal = document.createElement('div');
    modal.id = 'add-modal';
    modal.className = 'modal-mask';
    modal.addEventListener('click', e => {
        if (e.target.className === 'modal-mask') {
            fadeOut(modal, 200);
        }
    });

    const modalContent = document.createElement('form');
    modalContent.className = 'modal-content';
    modalContent.addEventListener('submit', async e => {
        e.preventDefault();
        if (addInput.value.trim()) {
            const newItem = {
                text: addInput.value,
                color: store.getState().config.newItemColor
            };
            await store.dispatch(startUnshiftItem('todo', newItem));
            fadeOut(modal, 200);
            addInput.value = '';
            renderList('todo-list');
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