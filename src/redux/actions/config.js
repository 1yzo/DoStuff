export const setDragSource = (dragSourceEl) => ({
    type: 'SET_DRAG_SOURCE',
    dragSource: dragSourceEl
});

export const setDragSourceIndex = index => ({
    type: 'SET_DRAG_SOURCE_INDEX',
    index
});

export const setJustDroppedId = (itemId) => ({
    type: 'SET_JUST_DROPPED_ID',
    itemId
});

export const setNewItemColor = (color) => ({
    type: 'SET_NEW_ITEM_COLOR',
    color
});