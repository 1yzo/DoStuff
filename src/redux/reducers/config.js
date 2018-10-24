const defaultState = {
    dragSource: null,
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
        case 'SET_JUST_DROPPED_ID':
            return {
                ...state,
                justDroppedId: action.justDroppedId
            };
        case 'SET_NEW_ITEM_COLOR':
            return {
                ...state,
                newItemColor: action.newItemColor
            };
        default:
            return state;
    }
};