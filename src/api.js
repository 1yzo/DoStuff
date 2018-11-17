import { store, renderList } from './index';
import { setList } from './redux/actions/lists';
import { mapLinkPreviews } from './utils';

export const createBoard = async () => {
    const res = await fetch('http://ec2-107-22-155-164.compute-1.amazonaws.com/boards', { method: 'POST' });
    const payload = await res.json();
    return payload._id;
};

export const loadBoard = (currentBoard) => {
    return fetch(`http://ec2-107-22-155-164.compute-1.amazonaws.com/boards/${currentBoard}`)
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
}