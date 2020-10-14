const lsTokenKey = 'my_app_token';

function setToken(req) {
    const isAuthUrl = req.url.includes('news');
    if (isAuthUrl) {
        const token = localStorage.getItem(lsTokenKey);
        req.headers['x-access-token'] = token;
    }
    return req;
}

function setTokenOnLogin(res) {
    const loginUrl = res.config.url.includes('login');
    if (loginUrl) {
        const token = res.data.token;
        localStorage.setItem(lsTokenKey, token);
    }
    return res;
}

function getClearResponse(res) {
    return res.data;
}

function onError(err) {
    console.dir(err);
    return Promise.reject(err);
}

export default function (axios) {
    axios.interceptors.request.use(setToken);
    axios.interceptors.response.use(setTokenOnLogin);
    axios.interceptors.response.use(getClearResponse, onError);
}