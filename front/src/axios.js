import axios from "axios";

function getLoginStateFromLocalStorage() {
    return localStorage.getItem('loginState') === 'true';
}

function getUsernameFromLocalStorage() {
    return localStorage.getItem('username') || '';
}

function setLoginStateToLocalStorage(isLoggedIn) {
    localStorage.setItem('loginState', isLoggedIn.toString());
}

function setUsernameToLocalStorage(username) {
    localStorage.setItem('username', username);
}


const api = axios.create({
    //baseURL: 'http://43.203.170.251:8000',
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json'
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token && !config.url.endsWith('/login/') && !config.url.endsWith('/registration/')) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
const reissueAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('/accounts/dj-rest-auth/token/refresh/', null, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });

        if (response.data.success) {
            const { access_token } = response.data.data;
            localStorage.setItem('access_token', access_token);
            api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
        } else {
            console.error(response.data.error);
        }
    } catch (error) {
        console.error(error);
    }
};

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                const tokenRefreshed = await reissueAccessToken();
                if (tokenRefreshed) {
                    return api(originalRequest);
                }
            }
            // 로그아웃 처리
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setLoginStateToLocalStorage(false);
            setUsernameToLocalStorage('');
            alert('로그인이 필요합니다.');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export default api;
