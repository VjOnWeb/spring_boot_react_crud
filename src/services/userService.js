import axios from "axios";

const REST_API_IMAGE_URL = 'http://localhost:9898/api/images/all_images';
const REST_API_USER_LIST = 'http://localhost:9898/users';

// export const listEmployees = () => {
//     return axios.get(REST_API_IMAGE_URL);
// }

export const listUser = () =>  axios.get(REST_API_USER_LIST);
export const listImages = () =>  axios.get(REST_API_IMAGE_URL);

