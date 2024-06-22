import axios from 'axios';

const axiosPlugin = {
    install(App) {
        let token = 'token';


        const axiosInstance = axios.create({
            baseURL: 'http://51.68.46.67:8000',
            // baseURL: 'http://51.68.46.67:8000',
        });


        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        App.config.globalProperties.$axios = axiosInstance;
        App.config.globalProperties.$updateToken = (newToken) => {
            token = newToken;
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        };
    }
};

export default axiosPlugin;
