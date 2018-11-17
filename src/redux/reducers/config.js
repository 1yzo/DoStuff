const defaultState = {
    dragSource: null,       // The html element
    dragSourceIndex: null,
    justDroppedId: null,
    newItemColor: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_DRAG_SOURCE':
            return {
                ...state,
                dragSource: action.dragSource
            };
        case 'SET_DRAG_SOURCE_INDEX':
            return {
                ...state,
                dragSourceIndex: action.index
            };
        case 'SET_JUST_DROPPED_ID':
            return {
                ...state,
                justDroppedId: action.itemId
            };
        case 'SET_NEW_ITEM_COLOR':
            return {
                ...state,
                newItemColor: action.color
            };
        default:
            return state;
    }
};