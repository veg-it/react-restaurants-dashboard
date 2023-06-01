import axios from 'axios';

const apiurl =  'https://vladislava.pythonanywhere.com/';

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

//Управління комментарами
export function getReviews() {
    return axios.get(`${apiurl}reviews`);
}

export function addReview(reviewData) {
    return axios.post(`${apiurl}reviews`, reviewData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deleteReview(id) {
    return axios.delete(`${apiurl}reviews/${id}`);
}

export function updateReview(id, reviewData) {
    return axios.put(`${apiurl}reviews/${id}`, reviewData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

//Управління вакансіями
export function getVacancies() {
    return axios.get(`${apiurl}vacancies`);
}

export function addVacancy(vacancyData) {
    return axios.post(`${apiurl}vacancies`, vacancyData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deleteVacancy(id) {
    return axios.delete(`${apiurl}vacancies/${id}`);
}

export function updateVacancy(id, vacancyData) {
    return axios.put(`${apiurl}vacancies/${id}`, vacancyData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

//Управління запитами на ваканії
export function getVacancyRequests() {
    return axios.get(`${apiurl}vacancyrequest`);
}

export function addVacancyRequest(vacancyData) {
    return axios.post(`${apiurl}vacancyrequest`, vacancyData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deleteVacancyRequest(id) {
    return axios.delete(`${apiurl}vacancyrequest/${id}`);
}

export function updateVacancyRequest(id, vacancyData) {
    return axios.put(`${apiurl}vacancyrequest/${id}`, vacancyData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
 

//Управління персоналом 
export function getUsers() {
    return axios.get(`${apiurl}users`);
}

export function addUser(vacancyData) {
    return axios.post(`${apiurl}users`, vacancyData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deleteUser(id) {
    return axios.delete(`${apiurl}users/${id}`);
}

export function updateUser(id, vacancyData) {
    return axios.put(`${apiurl}users/${id}`, vacancyData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}