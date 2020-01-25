import axios from 'axios';

export function setCharacter(payload) {
    return {
        type: 'SET_CHARACTER',
        payload
    };
} 

export function getCharacters(userId) {
    return function(dispatch) {
        return axios({
            method: 'post',
            url: 'http://localhost:8000/user/characterslist',
            data: {
                userId
            }
        })
        .then(({ data }) => {
            dispatch({ type: "SET_CHARACTER_LIST", payload: data });
        })
        .catch(err => {
            console.log(err);
        });
    }
};
