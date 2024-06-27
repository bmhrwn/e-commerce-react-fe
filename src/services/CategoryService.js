import api from './api';

export const findAllCategory = async () => {
    return await api.get("/api/category");
}

export const createCategory = async (category) => {
    return await api.post("/api/category", category);
}


export const updateCategory = async (category) => {
    return await api.put("/api/category", category);
}

export const deleteCategory = async (id) => {
    return await api.delete(`/api/category/${id}`);
}

