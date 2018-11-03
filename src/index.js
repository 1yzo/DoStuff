// Components
import Item from './components/Item';
import List from './components/List';
import AddItemModal from './components/AddItemModal';
// Modules
import { getListKey, fadeIn, fadeOut, mapLinkPreviews } from './utils';
import configureStore from './redux/configureStore';
import { setList } from './redux/actions/lists';
// Styles
import './styles/base.css';
import './styles/header.css';
import './styles/modal.css';
import './styles/inputs.css';

export const store = configureStore();

const listContainer = document.querySelector('#list-container');
listContainer.appendChild(List({ id: 'todo-list', title: 'Stuff To-do' }));
listContainer.appendChild(List({ id: 'doing-list', title: "Stuff I'm Doing" }));
listContainer.appendChild(List({ id: 'done-list', title: 'Stuff I Did'}));

const boardId = '5bd28aec47a9d405447ba91f';
fetch(`http://localhost:3000/boards/${boardId}`)
    .then(res => { 
        if (res.status === 200) return res.json() 
        else throw new Error('Something went wrong.')
    })
    .then(({ todo, doing, done }) => {
       mapLinkPreviews(todo).then(items => {
           store.dispatch(setList('todo', items));
           renderList('todo-list', { save: false });
       });
       mapLinkPreviews(doing).then(items => {
           store.dispatch(setList('doing', items));
           renderList('doing-list', { save: false });
       });
       mapLinkPreviews(done).then(items => {
           store.dispatch(setList('done', items));
           renderList('done-list', { save: false });
       })
    })
    .catch(err => console.log(err));

// Save to database and re-render list
export function renderList(listId, options = { save: true }) {
    const listKey = getListKey(listId);
    // Save
    if (options.save) {
        fetch(`http://localhost:3000/boards/${boardId}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                [listKey]: store.getState().lists[listKey].map(({ linkPreview, ...rest }) => ({ ...rest }))
            })
        })
            .catch(err => console.log(err)); // Show a network error dialog if there's no internet connection
    }
    // Render
    const list = document.querySelector(`#${listId}`);
    list.innerHTML = null;
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