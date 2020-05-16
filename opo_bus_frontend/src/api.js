import axios from "axios";

export default {
    user: {
        login: (credentials) => axios.post("http://192.168.160.103:51080/user/login", credentials).then((res) => res).catch((err) => err.response),
    },
};
