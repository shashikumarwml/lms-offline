import {axiosInstance} from '../libs/utils';
import {LoginTypes} from '../types/auth';

export default async function loginService(values: LoginTypes) {
  try {
    const data = await axiosInstance.post('/auth/login/', values);
    return {data};
  } catch (error) {
    const err = error;
    const response = err.response;
    const {data, status, statusText} = response;
    let errors = {};
    if (status === 400 && data && Object.keys(data).length > 0) {
      errors = data;
    } else {
      errors.nonFieldErrors = [statusText, 'Please try later'];
    }
    return {errors};
  }
}
