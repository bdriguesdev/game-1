import axios from 'axios';

export function moveFromSetToInv({ from, to, charId }) {
    return function(dispatch) {
        return axios({
            method: 'post',
            url: 'http://localhost:8000/character/set',
            data: {
                charId,
                from,
                to
            }
        })
        .then(({ data }) => {
            dispatch({ type: "SET_CHARACTER", payload: data.character });
        })
        .catch(err => {
            console.log(err);
        });
    }
};

export function moveFromPotionsToInv({ from, to, charId }) {
    return function(dispatch) {
        return axios({
            method: 'post',
            url: 'http://localhost:8000/character/hotkeys/',
            data: {
                charId,
                from,
                to
            }
        })
        .then(({ data }) => {
            dispatch({ type: "SET_CHARACTER", payload: data.character });
        })
        .catch(err => {
            console.log(err);
        });
    }
};

export function moveFromShopToInv({ from, to, charId }) {
    return function(dispatch) {
        return axios({
            method: 'post',
            url: 'http://localhost:8000/shop/',
            data: {
                charId,
                from,
                to
            }
        })
        .then(({ data }) => {
            dispatch({ type: "SET_CHARACTER", payload: data.character });
        })
        .catch(err => {
            console.log(err);
        });
    }
};

export function moveInv({ from, to, charId }) {
    return function(dispatch) {
        return axios({
            method: 'post',
            url: 'http://localhost:8000/inventory',
            data: {
                charId,
                from,
                to
            }
        })
        .then(({ data }) => {
            dispatch({ type: "SET_CHARACTER", payload: data.character });
        })
        .catch(err => {
            console.log(err);
        });
    }
};