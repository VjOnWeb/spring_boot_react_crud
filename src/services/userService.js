import axiosWithAuth from "../axiosWithAuth";
import { useApi } from "../context/ApiContext";

const useUserService = () => {
  const { getBaseUrl } = useApi();

  const saveUser = (userData) =>
    axiosWithAuth.post(`${getBaseUrl()}/api/save`, userData);

  const listUser = () =>
    axiosWithAuth.get(`${getBaseUrl()}/api/users`);

  const updateUser = (id, userData) =>
    axiosWithAuth.put(`${getBaseUrl()}/api/update/${id}`, userData);

  const deleteUser = (id) =>
    axiosWithAuth.delete(`${getBaseUrl()}/api/delete/${id}`);

  return { saveUser, listUser, updateUser, deleteUser };
};

export default useUserService;
