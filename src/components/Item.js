// Components
import Divider from './Divider';
import TrashTarget from './TrashTarget';
import ItemModal from './ItemModal';
// Modules
import { store } from '../index';
import { setDragSource, setJustDroppedId } from '../redux/actions/config';
import { editItem } from '../redux/actions/lists';
import { fadeIn, fadeOut, findAndReplaceLinks, getLinkPreview, shortenText } from '../utils';
// Styles
import '../styles/item.css';
import '../styles/link-preview.css';

const Item = (props) => {
    const { title, index, justDropped, color, comments } = props;

    const itemParentEl = document.createElement('div');
    const item = document.createElement('div');
    item.className = 'item';
    justDropped && item.classList.add('item--dropped');
    item.draggable = 'true';

    const headerEl = document.createElement('div');
    headerEl.className = 'item__header';
    headerEl.style.backgroundColor = color
    item.appendChild(headerEl);

    const contentEl = document.createElement('div');
    contentEl.className = 'item__content';
    contentEl.innerHTML = findAndReplaceLinks(title);
    item.appendChild(contentEl);

    const linkPreviewContainer = document.createElement('div');
    contentEl.appendChild(linkPreviewContainer);


    renderLinkPreview(linkPreviewContainer, props);

    const commentCount = document.createElement('div');
    commentCount.className = 'item__comment-count';
    const commentIcon = document.createElement('i');
    const commentNumber = document.createElement('span');
    commentNumber.innerHTML = comments.length;
    commentIcon.className = 'fas fa-comment-alt item__comment-icon';
    commentCount.appendChild(commentIcon);
    commentCount.appendChild(commentNumber);
    if (comments.length > 0) {
        contentEl.appendChild(commentCount);
    } else {
        contentEl.style.paddingBottom = '20px';
    }

    item.addEventListener('dragstart', e => handleDragStart(e, props)); 
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('click', e => handleClick(e, props));

    index === 0 && itemParentEl.appendChild(Divider({ index: 0 }));
    itemParentEl.appendChild(item);
    itemParentEl.appendChild(Divider({ index: index + 1 }));

    return itemParentEl;
};

function handleClick(e, props) {
    const itemModalEl = ItemModal({
        item: props,
        parentListId: e.target.parentElement.parentElement.id
    });
    document.body.appendChild(itemModalEl);
    fadeIn(itemModalEl, 200);
    itemModalEl.style.display = 'initial';
}

function handleDragStart(e, props) {
    store.dispatch(setJustDroppedId(null));
    e.target.classList.add('item--over');
    store.dispatch(setDragSource(e.target));
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/json', JSON.stringify(props));
    // Show remove item option
    const trashTargetEl = TrashTarget();
    document.querySelector('#trash-option-container').appendChild(trashTargetEl);
    fadeIn(trashTargetEl, 200);
}

function handleDragEnd(e) {
    e.target.classList.remove('item--over');
    store.dispatch(setDragSource(null));
    // Hide remove item option
    const trashTargetEl = document.querySelector('.option--trash');
    fadeOut(trashTargetEl, 200);
}

function handleDrop(e) {
    e.stopPropagation();
    e.target.classList.remove('item--over');
}

async function renderLinkPreview(containerEl, props) {
    let linkPreview;
    if (props.linkPreview) {
        linkPreview = props.linkPreview;
    } else {
        try {
            linkPreview = await getLinkPreview(props.title);
            store.dispatch(editItem(props.id, { linkPreview }));
        } catch (e) {
            return;
        }
    }
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
            titleEl.innerHTML = shortenText(linkPreview['og:title'], 23);
            previewInfoEl.appendChild(titleEl);
        }
        if (linkPreview['og:description']) {
            const descriptionEl = document.createElement('div');
            descriptionEl.className = 'link-preview__description';
            descriptionEl.innerHTML = shortenText(linkPreview['og:description'], 70);
            previewInfoEl.appendChild(descriptionEl);
        }
        // if (linkPreview['og:url']) {
        //     const urlEl = document.createElement('div');
        //     urlEl.className = 'link-preview__url';
        //     urlEl.innerHTML = linkPreview['og:url'];
        //     previewInfoEl.appendChild(urlEl);
        // }
        previewEl.appendChild(previewInfoEl);
        containerEl.appendChild(previewEl);
    }
}

export default Item;