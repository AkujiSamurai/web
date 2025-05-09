import axios from "axios"

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

export const fetchBasket = async (user_id) => {
    try {
        const response = await axios.get('basket', { params: { id_user: user_id } });
        return response.data;
    }
    catch (error) {
        console.error("Ошибка при загрузке корзины", error);
    }
}

export const fetchUser = async (user_id) => {
    try {
        const response = await axios.get(`profile/${user_id}`);
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