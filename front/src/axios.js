import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', //API의 기본 URL 설정
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
        const response = await axios.post('/auth/customers/reissue', null, {
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
        if (error.response && error.response.status === 433 && !originalRequest._retry) {
            originalRequest._retry = true;
            await reissueAccessToken();
            return api(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default api;
