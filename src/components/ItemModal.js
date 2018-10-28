// Node Modules
import moment from 'moment';
// Modules
import { fadeOut } from '../utils';

const ItemModal = (item) => {
    const modal = document.createElement('div');
    modal.className = 'modal-mask';
    modal.addEventListener('click', e => e.target.className === 'modal-mask' && fadeOut(modal, 200));

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content modal-content--uncentered';

    const titleEl = document.createElement('h1');
    titleEl.className = 'modal-content__title';
    titleEl.innerHTML = item.title;
    modalContent.appendChild(titleEl);

    const dateEl = document.createElement('div');
    dateEl.className = 'modal-content__date';
    dateEl.innerHTML = moment(item.date).format('MMMM Do, YYYY');
    modalContent.appendChild(dateEl);

    modal.appendChild(modalContent);
    return modal;
};

export default ItemModal;