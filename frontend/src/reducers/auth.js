export const tokenReducer = (state=null, action) => {
    switch(action.type) {
        case 'SET_TOKEN':
            return action.payload;
        default:
            return state;
    }
};

export const userIdReducer = (state=null, action) => {
    switch(action.type) {
        case 'SET_USER_ID':
            return action.payload;
        default:
            return state;
    }
};

export const userReducer = (state=null, action) => {
    switch(action.type) {
        case 'SET_USER':
            return action.payload;
        default:
            return state;
    }
};
