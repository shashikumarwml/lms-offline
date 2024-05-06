interface headersTypes {
  'content-type'?: string;
  Authorization: string;
}

export default function getHeaders(
  accessToken: string | undefined,
  multipart: boolean = false,
) {
  const headers: headersTypes = {
    Authorization: '',
  };

  if (accessToken != null && accessToken.length > 0) {
    headers.Authorization = `Token ${accessToken}`;
  }
  if (!multipart) {
    headers['content-type'] = 'application/json';
  }
  return headers;
}
