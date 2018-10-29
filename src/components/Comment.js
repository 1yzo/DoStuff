// Node Modules
import moment from 'moment';
// Styles
import '../styles/comment.css';

const Comment = ({ text, date, color }) => {
    const commentEl = document.createElement('div');
    commentEl.className = 'comment';
    commentEl.style.borderLeft = `4px solid ${color}`;

    const textEl = document.createElement('p');
    textEl.className = 'comment__text';
    textEl.innerHTML = text;
    commentEl.appendChild(textEl);
    
    const dateContainerEl = document.createElement('div');
    dateContainerEl.className = 'comment__date-container';

    const dateEl = document.createElement('div');
    dateEl.className = 'comment__date';
    dateEl.innerHTML = moment(date).format('MM/DD/YY');

    const timeEl = document.createElement('div');
    timeEl.className = 'comment__date';
    timeEl.innerHTML = moment(date).format('LT');

    dateContainerEl.appendChild(timeEl);
    dateContainerEl.appendChild(dateEl);
    
    commentEl.appendChild(dateContainerEl);
    
    return commentEl;
};

export default Comment;