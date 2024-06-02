import axios from "axios";

const api = axios.create({
    //baseURL: 'http://54.180.118.53:8000',
    baseURL: 'http://0.0.0.0:8000',
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
            alert('로그인이 필요합니다.');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
