import axios from "axios";


const REST_API_IMAGE_URL = "http://localhost:9898/api/images";

export const  listAllImages = () => axios.get(REST_API_IMAGE_URL + "/all_images");

export const  getImage = (id) => axios.get(REST_API_IMAGE_URL + "/"+id);

// export const  deleteImage = () => axios.get(REST_API_IMAGE_URL + "/");
