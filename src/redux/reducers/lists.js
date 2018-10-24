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
        case 'UNSHIFT_ITEM': {
            const { listKey, newItem } = action;
            return {
                ...state,
                [listKey]: [newItem, ...state[listKey]].map((item, index) => ({
                    ...item,
                    index
                }))
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
            const { sourceListKey, destListKey, item, newIndex, oldId } = action;
            
            // Insert at new index in destination list
            let nextDestList = [...state[destListKey]];
            nextDestList.splice(newIndex, 0, item);
            // Remove from source list
            const nextSourceList = [...state[sourceListKey]];
            // If destination and source are  same just return filtered destList
            if (sourceListKey !== destListKey) {
                return {
                    ...state,
                    [destListKey]: [...nextDestList].map((item, index) => ({
                        ...item,
                        index
                    })),
                    [sourceListKey]: [...nextSourceList]
                        .filter(({ id }) => id !== oldId)
                        .map((item, index) => ({
                            ...item,
                            index
                        }))
                };
            } else {
                return {
                    ...state,
                    [destListKey]: [...nextDestList]
                        .filter(({ id }) => id !== oldId)
                        .map((item, index) => ({
                            ...item,
                            index
                        }))
                };
            }
        }
        case 'REMOVE_ITEM': {
            const { listKey, index } = action;
            let nextList = [...state[listKey]];
            nextList.splice(index, 1);
            return {
                ...state,
                [listKey]: [...nextList].map((item, i) => ({
                    ...item,
                    index: i
                }))
            };
        }
        default:
            return state;
    }
};