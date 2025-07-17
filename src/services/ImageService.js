// src/services/ImageService.js
import axiosWithAuth from "../axiosWithAuth";
import { useApi } from "../context/ApiContext";

export const useImageService = () => {
  const { getBaseUrl } = useApi();

  const listAllImages = () => {
    return axiosWithAuth.get(`${getBaseUrl()}/api/images/all_images`);
  };

  const getImage = (id) => {
    return axiosWithAuth.get(`${getBaseUrl()}/api/images/${id}`, {
      responseType: 'blob',
    });
  };

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return axiosWithAuth.post(`${getBaseUrl()}/api/images/uploadImage`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const deleteImage = (id) => {
    return axiosWithAuth.delete(`${getBaseUrl()}/api/images/${id}`);
  };

  return {
    listAllImages,
    getImage,
    uploadImage,
    deleteImage,
  };
};
