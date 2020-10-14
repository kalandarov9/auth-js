import axios from '../plugins/axios';
export async function getContryList() {
    try {
        const response = await axios.get(`/location/get-countries`);
        return response;
    } catch (err) {
        console.log(err);
        return Promise.reject(err)
    };
}
