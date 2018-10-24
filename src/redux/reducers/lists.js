import uuid from 'uuid/v4';

const defaultState = {
    todo: [],
    doing: [],
    done: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_LIST': {
            const { listKey, items } = action;
            return {
                ...state,
                [listKey]: items
            }; 
        }
        case 'PUSH_ITEM': {
            const { listKey, newItem } = action;
            return {
                ...state,
                [listKey]: [...state[listKey], newItem].map((item, index) => ({
                    ...item,
                    index
                }))
            }
        }
        case 'INSERT_ITEM': {
            const { listKey, item, newIndex } = action;

            let nextList = [...state[listKey]];
            const newId = uuid();
            nextList.splice(newIndex, 0, { ...item, id: newId });
            nextList = nextList.filter(({ id }) => id !== item.id);

            return {
                ...state,
                [listKey]: [...nextList]
            }
        }
        default:
            return state;
    }
};