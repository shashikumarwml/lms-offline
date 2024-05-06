import {genericGetService} from '../libs/generics';

export default async function getUserDetailsService(accessToken: string) {
  return await genericGetService('/auth/user/', accessToken);
}

export  async function getSubjectsService(accessToken: string) {
  return await genericGetService('/student/enrollments/118/subjects/', accessToken);
}
