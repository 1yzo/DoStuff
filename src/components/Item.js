const Item = (text, offsetY = 0) => {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = text;
    item.style.top = `${offsetY}px`;
    return item;
};

export default Item;