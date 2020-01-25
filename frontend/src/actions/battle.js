import axios from 'axios';

export function useItem({ from, charId }) {
    return function(dispatch) {
        return axios({
            method: 'post',
            url: 'http://localhost:8000/battle/use/',
            data: {
                charId,
                from
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

export function attack({ spell, charId }) {
    return function(dispatch) {
        return axios({
            method: 'post',
            url: 'http://localhost:8000/battle/attack',
            data: {
                charId,
                spell
            }
        });
    }
};