import api from './api';

export const findAllProduct = async () => {
    return await api.get("/api/product");
}

export const findProductById = async(id) => {
    return await api.get(`/api/product/${id}`);
}

export const createProduct = async (product) => {
    return await api.post("/api/product", product);
}

export const updateProduct = async (id,product) => {
    return await api.put(`/api/product/${id}`, product);
}

export const deleteProduct = async (id) => {
    return await api.delete(`/api/product/${id}`);
}

