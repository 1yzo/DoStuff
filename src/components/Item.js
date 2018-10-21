import { handleDragStart, handleDragOver, handleDragEnter, handleDragLeave, handleDragEnd, handleDrop } from '../index';

const Item = (text) => {
    const item = document.createElement('div');
    item.className = 'item';
    item.draggable = 'true';
    item.innerHTML = text;

    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('dragend', handleDragEnd, false);
    item.addEventListener('drop', handleDrop, false);

    return item;
};

export default Item;