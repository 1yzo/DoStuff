// Node Modules
import moment from 'moment';
// Modules
import { findAndReplaceLinks, getLinkPreview, shortenText } from '../utils';
// Styles
import '../styles/comment.css';

const Comment = ({ text, date, color }) => {
    const commentEl = document.createElement('div');
    commentEl.className = 'comment';
    commentEl.style.borderLeft = `4px solid ${color}`;

    const textEl = document.createElement('p');
    textEl.className = 'comment__text';
    textEl.innerHTML = findAndReplaceLinks(text);
    commentEl.appendChild(textEl);

    const linkPreviewContainer = document.createElement('div');
    commentEl.appendChild(linkPreviewContainer);
    renderLinkPreview(linkPreviewContainer, text);
    
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

async function renderLinkPreview(containerEl, text) {
    const linkPreview = await getLinkPreview(text);
    if (linkPreview) {
        const previewEl = document.createElement('div');
        previewEl.className = 'link-preview';
        if (linkPreview['og:image']) {
            const imageEl = document.createElement('img');
            imageEl.className = 'link-preview__image';
            imageEl.src = linkPreview['og:image'];
            previewEl.appendChild(imageEl);
        }
        const previewInfoEl = document.createElement('div');
        previewInfoEl.className = 'link-preview__info';
        if (linkPreview['og:title']) {
            const titleEl = document.createElement('div');
            titleEl.className = 'link-preview__title';
            titleEl.innerHTML = shortenText(linkPreview['og:title'], 53);
            previewInfoEl.appendChild(titleEl);
        }
        if (linkPreview['og:description']) {
            const descriptionEl = document.createElement('div');
            descriptionEl.className = 'link-preview__description';
            descriptionEl.innerHTML = shortenText(linkPreview['og:description'], 205);
            previewInfoEl.appendChild(descriptionEl);
        }
        previewEl.appendChild(previewInfoEl);
        containerEl.appendChild(previewEl);
    }
}
export default Comment;