import {genericGetService} from '../libs/generics';

export default async function getUserDetailsService(accessToken: string) {
  return await genericGetService('/auth/user/', accessToken);
}

export async function getChaptersService(accessToken: string) {
  return await genericGetService(
    '/student/subjects/1286/chapters/',
    accessToken,
  );
}

export async function getTopicsService(accessToken: string, id) {
  return await genericGetService(
    `/student/topics/${id}/contents/`,
    accessToken,
  );
}
