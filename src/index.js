import Item from './components/Item';

import './styles/base.css';
import './styles/list.css';

const todoContainer = document.querySelector('.todo-container');
const doingContainer = document.querySelector('.doing-container');
let mouseOffset = { x: 0, y: 0 };
let isMouseDown = false;
let selectedItem = undefined;

todoContainer.appendChild(Item('Item Number One'));
todoContainer.appendChild(Item('Item Number Two', 70));

Array.from(todoContainer.children).forEach(item => {
    item.addEventListener('mousedown', e => {
        onMouseDown(e, item);
    })
    item.addEventListener('mouseup', e => {
        onMouseUp(e, item);
    });
});

function onMouseDown(e, item) {
    selectedItem = item;
    mouseOffset = { 
        x: item.offsetLeft - e.clientX,
        y: item.offsetTop - e.clientY
    };

    item.style.background = 'yellowgreen';
}

window.addEventListener('mousemove', e => {
    if (selectedItem) {
        selectedItem.style.left = e.clientX + mouseOffset.x;
        selectedItem.style.top = e.clientY + mouseOffset.y;
    }
});

function onMouseUp(e, item) {
    selectedItem = null;
    item.style.background = 'orange';
    if (e.clientX > doingContainer.offsetLeft && e.clientY > doingContainer.offsetTop) {
        const itemCopy = item;
        item.remove();
        doingContainer.appendChild(itemCopy);
        itemCopy.style.left = doingContainer.style.left;
    } else {
        const itemCopy = item;
        item.remove();
        todoContainer.appendChild(itemCopy);
        itemCopy.style.left = todoContainer.style.left;
    }
}
