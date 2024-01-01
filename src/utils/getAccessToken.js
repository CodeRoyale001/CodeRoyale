import DOMPurify from 'dompurify';

const getAccessToken = () => {
  const encodedToken = localStorage.getItem('accessToken');
  if (encodedToken) {
    const sanitizedToken = decodeURIComponent(encodedToken);
    return DOMPurify.sanitize(sanitizedToken);
  }
  return null;
};

export default getAccessToken;
