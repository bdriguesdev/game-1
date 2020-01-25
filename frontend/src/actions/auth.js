import axios from 'axios';

export function setToken(payload) {
    return {
        type: 'SET_TOKEN',
        payload
    }
}

export function setUserId(payload) {
    return {
        type: 'SET_USER_ID',
        payload
    }
}

export function setUser(payload) {
    return {
        type: 'SET_USER',
        payload
    };
};

export function createUser(userInfo) {
    const { email, userName, password } = userInfo;
    return function(dispatch) {
        return axios({
            method: 'post',
            url: 'http://localhost:8000/user/create',
            data: {
                email,
                userName,
                password
            }
        })
        .then(response => response.json())
        .then(({ data }) => {
            dispatch({ type: "SET_USER", payload: data });
        })
        .catch(err => {
            console.log(err);
        });
    }
};

export function logIn(credentials) {
    const { email, password } = credentials;
    return function(dispatch) {
        return axios({
            method: 'post',
            url: 'http://localhost:8000/login',
            data: {
                email,
                password
            }
        })
        .then(({ data }) => {
            if(data.error) {
                console.log(data.error);
            } else {
                dispatch({ type: "SET_USER", payload: data.userInfo });
                dispatch({ type: "SET_USER_ID", payload: data.userId });
                dispatch({ type: "SET_TOKEN", payload: data.token }); 
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
};