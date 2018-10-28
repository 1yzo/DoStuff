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
    commentsContainerEl.innerHTML = '<div>Comments</div>'
    item.comments.forEach(comment => commentsContainerEl.appendChild(Comment(comment)));

    modalContent.append(infoEl);
    modalContent.append(commentsContainerEl);
    modal.appendChild(modalContent);
    return modal;
};

export default ItemModal;