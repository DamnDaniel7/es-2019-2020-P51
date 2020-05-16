import {USER_LOGGED_IN, USER_LOGGED_OUT} from "types.js";
import api from "api.js";

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT,
});

export const login = credentials => dispatch =>
    api.user.login(credentials).then(() =>
        {
            const user = {
                username: credentials.username
            }
            localStorage.esp51JWT = user.username;
            dispatch(userLoggedIn(user));
            return true;
        }
    ).catch(() => {
        return false;
    });

export const logout = () => dispatch => {
    localStorage.removeItem("esp51JWT");
    dispatch(userLoggedOut())
};