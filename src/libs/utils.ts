import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://dev-lms-api.wmlit.com/api',
});
const ACCESS_TOKEN = 'lms_token';

axiosInstance.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err),
);

export const noHeaderOptions = {
  headerShown: false,
  header: null,
};

export default async function setAccessToken(token :any) {
  await AsyncStorage.setItem(ACCESS_TOKEN, token, err => {
    if (err) {
      throw err;
    }
  }).catch(err => {
    console.log(`MSERR::LOGIN::an error while storing access key= ${err}`);
  });
}

export  async function getAccessToken() {
  let accessToken;
  if (ACCESS_TOKEN !== undefined) {
    accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    return accessToken;
  }
  return accessToken;
}

export async function removeItemValue(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}
