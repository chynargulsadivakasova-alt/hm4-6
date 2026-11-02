import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data;
};