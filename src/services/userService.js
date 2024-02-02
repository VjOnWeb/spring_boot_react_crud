import axios from 'axios';

const REST_API_USER_LIST = 'http://localhost:9898/api/users';
const REST_API_SAVE_USER = 'http://localhost:9898/api/save';
const REST_API_UPDATE_USER = 'http://localhost:9898/api/update';
const REST_API_DELETE_USER = 'http://localhost:9898/delete';

export const listUser = () => axios.get(REST_API_USER_LIST);

export const saveUser = (userData) => axios.post(REST_API_SAVE_USER, userData);

export const updateUser = (userId, userData) =>
  axios.put(`${REST_API_UPDATE_USER}/${userId}`, userData);

export const deleteUser = (userId) => axios.delete(`${REST_API_DELETE_USER}/${userId}`);

export default {
  listUser,
  saveUser,
  updateUser,
  deleteUser,
};
