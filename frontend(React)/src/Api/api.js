import axios from "axios"
import store from "../redux/store";

axios.interceptors.request.use(config => {
    const token = store.getState().auth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export const fetchItems = async () => {
    try {
        const response = await axios.get("home");
        return response.data
    }
    catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
    }
}

export const fetchItem = async (id) => {
    try {
        const response = await axios.get(`product/${id}`);
        return response.data;
    }
    catch (error) {
        console.error("Ошибка при загрузке товара:", error)
    }
}

export const fetchBasket = async () => {
    try {
        const response = await axios.get('basket');
        return response.data;
    }
    catch (error) {
        console.error("Ошибка при загрузке корзины", error);
    }
}

export const fetchUser = async () => {
    try {
        const response = await axios.get(`profile`);
        return response.data;
    }
    catch (error) {
        console.error("Ошибка при загрузке пользователя", error);
    }
}

export const authUser = async (login, password) => {
    try {
        const response = await axios.post('login', { login: login, password: password });
        return {
            success: true,
            ...response.data
        };
    }
    catch (error) {
        console.error("Ошибка при логине пользователя", error);
        return {
            success: false,
            status: error.response.status
        };
    }
}

export const registerUser = async (login, password) => {
    try {
        const response = await axios.post('register', { login: login, password: password });
        return {
            success: true,
            ...response.data
        };
    }
    catch (error) {
        console.error("Ошибка при регистрации пользователя", error);
        return {
            success: false,
            status: error.response.status
        }
    }
}

export const logoutUser = async () => {
    try {
        const response = await axios.post('logout');
        delete axios.defaults.headers.common['Authorization'];
        
        return response.data;
    }
    catch (error) {
        delete axios.defaults.headers.common['Authorization'];

        console.error('Ошибка при выходе', error);
    }
}

export const addItemToBasket = async (user_id, product_id) => {
    try {
        const response = await axios.post('create', { id_user: user_id, id_product: product_id });
        return response;
    }
    catch (error) {
        console.error("Ошибка при добавлении товара в корзину", error);
    }
}

export const increaseCount = async (user_id, product_id) => {
    try {
        const response = await axios.put('increaseCount', { id_user: user_id, id_product: product_id });
        return response;
    }
    catch (error) {
        console.error("Ошибка при увеличении количества товаров в корзине", error);
    }
}

export const decreaceCount = async (user_id, product_id) => {
    try {
        const response = await axios.put('decreaseCount', { id_user: user_id, id_product: product_id });
        return response;
    }
    catch (error) {
        console.error("Ошибка при уменьшении товаров в корзине", error);
    }
}

export const deleteItemInBasket = async (id) => {
    try {
        const response = await axios.delete(`delete/${id}`);
        return response;
    }
    catch (error) {
        console.error("Ошибка при удалении товара из корзины", error);
    }
}

export const fetchUserViews = async (user_id) => {
    try {
        const response = await axios.get('user/view', { params: { id_user: user_id } });
        return response.data;
    }
    catch (error) {
        console.error('Ошибка при загрузке данных, просмотренных пользователем', error);
    }
}

export const addUserView = async (user_id, product_id) => {
    try {
        const response = await axios.post('user/create', { id_user: user_id, id_product: product_id });
        return response;
    }
    catch (error) {
        console.error('Ошибка при создании данных, просмотренных пользователем', error);
    }
}

export const fetchUserRecommendation = async (user_id) => {
    try {
        const response = await axios.get('user/recommendations', { params: { id_user: user_id } });
        return response.data;
    }
    catch (error) {
        console.error('Ошибка при загрузке рекомендаций', error);
    }
}