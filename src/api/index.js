import axios from 'axios';

const apiurl =  'https://vegit.pythonanywhere.com/';

// Управління рестораном
export function getRestaurants() {
    return axios.get(`${apiurl}restaurants`);
}

export function addRestaurant(restaurantData) {
    return axios.post(`${apiurl}restaurants`, restaurantData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function updateRestaurant(id, restaurantData) {
    return axios.put(`${apiurl}restaurants/${id}`, restaurantData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deleteRestaurant(id) {
    return axios.delete(`${apiurl}restaurants/${id}`);
}

// Управління категоріями
export function getCategories() {
    return axios.get(`${apiurl}categories`);
}

export function getCategoryById(id) {
    return axios.get(`${apiurl}categories/${id}`);
}

export function addCategory(categoryData) {
    return axios.post(`${apiurl}categories`, categoryData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function updateCategory(id, categoryData) {
    return axios.put(`${apiurl}categories/${id}`, categoryData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deleteCategory(id) {
    return axios.delete(`${apiurl}categories/${id}`);
}


// Управління продуктами
export function getProducts() {
    return axios.get(`${apiurl}products`);
}

export function addProduct(productData) {
    return axios.post(`${apiurl}products`, productData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function updateProduct(id, productData) {
    return axios.put(`${apiurl}products/${id}`, productData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deleteProduct(id) {
    return axios.delete(`${apiurl}products/${id}`);
}

//Управління аціями
export function getPromotions() {
    return axios.get(`${apiurl}promotions`);
}

export function addPromotion(promotionData) {
    return axios.post(`${apiurl}promotions`, promotionData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function updatePromotion(id, promotionData) {
    return axios.put(`${apiurl}promotions/${id}`, promotionData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deletePromotion(id) {
    return axios.delete(`${apiurl}promotions/${id}`);
}

// Управління меню
export function getMenus() {
    return axios.get(`${apiurl}menus`);
}

export function addMenu(menuData) {
    return axios.post(`${apiurl}menus`, menuData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deleteMenu(id) {
    return axios.delete(`${apiurl}menus/${id}`);
}

export function updateMenu(id, menuData) {
    return axios.put(`${apiurl}menus/${id}`, menuData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function getMenuByRestaurantId(id) {
    return axios.get(`${apiurl}menus/${id}`);
}

// Управління замовленням
export function getOrders() {
    return axios.get(`${apiurl}orders`);
}

export function addOrder(orderData) {
    return axios.post(`${apiurl}menus`, orderData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deleteOrder(id) {
    return axios.delete(`${apiurl}orders/${id}`);
}

export function updateOrder(id, orderData) {
    return axios.put(`${apiurl}orders/${id}`, orderData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function getOrdersByOrderId(id) {
    return axios.get(`${apiurl}orders/${id}`);
}