// Node Modules
import moment from 'moment';
// Components
import Comment from './Comment';
// Modules
import { fadeOut } from '../utils';

const ItemModal = (item) => {
    const modal = document.createElement('div');
    modal.className = 'modal-mask';
    modal.addEventListener('click', e => e.target.className === 'modal-mask' && fadeOut(modal, 200));

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content modal-content--uncentered';
    // modalContent.style.borderTop = `20px solid ${item.color}`

    const infoEl = document.createElement('div');
    infoEl.className = 'modal-content__info';
    
    const titleEl = document.createElement('h1');
    titleEl.className = 'modal-content__title';
    titleEl.innerHTML = item.title;
    infoEl.appendChild(titleEl);

    const dateEl = document.createElement('div');
    dateEl.className = 'modal-content__date';
    dateEl.innerHTML = moment(item.date).format('MM/DD/YYYY');
    infoEl.appendChild(dateEl);

    const commentsContainerEl = document.createElement('div');
    commentsContainerEl.className = 'comments-container';
  
    const commentsContainerHeaderEl = document.createElement('div');
    commentsContainerHeaderEl.className = 'comments-container__header';
    commentsContainerHeaderEl.innerHTML = '<div>Comments</div>'

    const addCommentEl = document.createElement('i');
    addCommentEl.className = 'fas fa-plus';
    addCommentEl.style.cursor = 'pointer';
    addCommentEl.addEventListener('click', () => handleAddCommentClick(item.id));
    commentsContainerHeaderEl.appendChild(addCommentEl);

    item.comments.forEach(comment => commentsContainerEl.appendChild(Comment(comment)));

    modal.appendChild(modalContent);
    modalContent.append(infoEl);
    modalContent.append(commentsContainerEl);
    commentsContainerEl.appendChild(commentsContainerHeaderEl);

    return modal;
};

function handleAddCommentClick(itemId) {
    console.log('hello');
}

export default ItemModal;