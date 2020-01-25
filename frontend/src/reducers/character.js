export const characterReducer = (state=null, action) => {
    switch(action.type) {
        case 'SET_CHARACTER':
            return action.payload;
        default:
            return state;
    }
};

export const charactersListReducer = (state=null, action) => {
    switch(action.type) {
        case 'SET_CHARACTER_LIST':
            return action.payload;
        default:
            return state;
    }
};
