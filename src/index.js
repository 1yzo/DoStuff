// Node Modules
import io from 'socket.io-client';
// Components
import Item from './components/Item';
import List from './components/List';
import AddItemModal from './components/AddItemModal';
// Modules
import { getListKey, fadeIn, fadeOut, copyToClipboard } from './utils';
import configureStore from './redux/configureStore';
import { createBoard, loadBoard } from './api';
import { setJustDroppedId } from './redux/actions/config';
// Styles
import './styles/base.css';
import './styles/header.css';
import './styles/modal.css';
import './styles/inputs.css';

export const store = configureStore();

let socket;
export const emit = (name, data) => {
    socket.emit(name, data);
};

const listContainer = document.querySelector('#list-container');
listContainer.appendChild(List({ id: 'todo-list', title: 'Stuff To Do' }));
listContainer.appendChild(List({ id: 'doing-list', title: "Stuff Being Done" }));
listContainer.appendChild(List({ id: 'done-list', title: "Stuff That's Done" }));

// If an id is in the url try to laod that board, otherwise create a new one.
let currentBoard; 
(async function initialize() {
    const boardFromUrl = window.location.pathname.slice(1);

    if (boardFromUrl) {
        currentBoard = boardFromUrl;
    } else {
        currentBoard = await createBoard();
    }

    try {
        await loadBoard(currentBoard);
    } catch (e) {
        currentBoard = await createBoard();
        await loadBoard(currentBoard);
    }

    window.history.pushState({}, '', currentBoard);
    socket = io('http://ec2-107-22-155-164.compute-1.amazonaws.com');
    socket.on('connect', () => {
        socket.emit('new user', currentBoard);
    });
    socket.on('update', (message) => {
        if (message.senderId !== socket.id) {
            message.justDroppedId ? store.dispatch(setJustDroppedId(message.justDroppedId)) : store.dispatch(setJustDroppedId(''));
            loadBoard(currentBoard).then(() => publish());
        }
    });
})()
    .then(() => {
        const spinnerMask = document.querySelector('#spinner-mask');
        spinnerMask.style.opacity = 1;
        fadeOut(spinnerMask, 200);
    });

let callbacks = [];  // For now this gets emptied every time esc is pressed
export const subscribeToRenderList = (cb) => {
    callbacks.push(cb);
};
export const unsubscribeFromRenderList = (func) => {
    callbacks = callbacks.filter(cb => cb !== func);
};
export function publish() {
    callbacks.forEach(cb => cb());
}

// Save to database and re-render list
export function renderList(listId, options = { save: true }) {
    const listKey = getListKey(listId);

    // Render
    const list = document.querySelector(`#${listId}`);
    list.innerHTML = '';
    store.getState().lists[listKey].forEach(item => {
        list.appendChild(Item({
            ...item,
            justDropped: item.id === store.getState().config.justDroppedId,
        }));
    });

    // Save
    if (options.save) {
        return fetch(`http://ec2-107-22-155-164.compute-1.amazonaws.com/boards/${currentBoard}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                [listKey]: store.getState().lists[listKey].map(({ linkPreview, ...rest }) => ({ ...rest }))
            })
        })
            // .then(() => socket.emit('update', store.getState().config.justDroppedId))
            .catch(err => console.log(err)); // Show a network error dialog if there's no internet connection
    }
    return new Promise(resolve => resolve()); 
}

// Popup modal for adding new items
const addButtonEl = document.querySelector('.add-button');
addButtonEl.addEventListener('click', () => {
    const modal = document.body.appendChild(AddItemModal());
    fadeIn(modal, 200);
    document.querySelector('#add-input').focus();
    document.querySelectorAll('.color-picker')[0].click();
});


// Close any open modal on ESC key press
window.addEventListener('keypress', (e) => {
    if (e.keyCode === 27) {
        const modal = document.querySelector('.modal-mask');
        modal && fadeOut(modal, 200);
        callbacks = [];
    }

    console.log(callbacks);
});

// Link button
const linkButton = document.querySelector('.option--link');
linkButton.addEventListener('click', () => {
    copyToClipboard(window.location.href);
    const tooltipEl = document.createElement('div');
    tooltipEl.className = 'option--link__tooltip';
    tooltipEl.innerHTML = 'Link copied to clipboard!';
    linkButton.appendChild(tooltipEl);
    fadeIn(tooltipEl, 100);
    setTimeout(() => {
        fadeOut(tooltipEl, 100);
    }, 1000);
});