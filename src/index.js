// Node Modules
import io from 'socket.io-client';
// Components
import Item from './components/Item';
import List from './components/List';
import AddItemModal from './components/AddItemModal';
// Modules
import { getListKey, fadeIn, fadeOut } from './utils';
import configureStore from './redux/configureStore';
import { createBoard, loadBoard } from './api';
// Styles
import './styles/base.css';
import './styles/header.css';
import './styles/modal.css';
import './styles/inputs.css';
import { setJustDroppedId } from './redux/actions/config';

export const store = configureStore();
let socket;

const listContainer = document.querySelector('#list-container');
listContainer.appendChild(List({ id: 'todo-list', title: 'Stuff To-do' }));
listContainer.appendChild(List({ id: 'doing-list', title: "Stuff I'm Doing" }));
listContainer.appendChild(List({ id: 'done-list', title: 'Stuff I Did'}));

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
    socket = io('http://localhost:3000');
    socket.on('connect', () => {
        socket.emit('new user', currentBoard);
    });
    socket.on('update', (message) => {
        if (message.senderId !== socket.id) {
            store.dispatch(setJustDroppedId(message.justDroppedId));
            loadBoard(currentBoard).then(() => publish());
        }
    });
})();

const callbacks = [];
export const subscribeToRenderList = (cb) => {
    callbacks.push(cb);
};
export function publish() {
    callbacks.forEach(cb => cb());
}

// Save to database and re-render list
export function renderList(listId, options = { save: true }) {
    const listKey = getListKey(listId);
    // Save
    if (options.save) {
        fetch(`http://localhost:3000/boards/${currentBoard}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                [listKey]: store.getState().lists[listKey].map(({ linkPreview, ...rest }) => ({ ...rest }))
            })
        })
            .then(() => socket.emit('update', store.getState().config.justDroppedId))
            .catch(err => console.log(err)); // Show a network error dialog if there's no internet connection
    } 
    // Render
    const list = document.querySelector(`#${listId}`);
    list.innerHTML = '';
    store.getState().lists[listKey].forEach(item => {
        list.appendChild(Item({
            ...item,
            justDropped: item.id === store.getState().config.justDroppedId,
        }));
    });
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
    }
});