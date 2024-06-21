import { setCookie } from './cookies';
import DOMPurify from 'dompurify';

const handleResponse = async (response: Response) => {
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
};

export const loginReq = async (
  url: string,
  postData: { [key: string]: string },
  accessToken: string,
  successCallback: (data: any) => void
): Promise<void> => {
  try {
    const sanitizedData = Object.entries(postData).reduce((acc: { [key: string]: string }, [key, value]) => {
      acc[key] = DOMPurify.sanitize(value);
      return acc;
    }, {});

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(sanitizedData),
    });

    const data: any = await handleResponse(response);
    successCallback(data);
  } catch (error) {
    throw error;
  }
};

export const postRequest = async (
  url: string,
  postData: { [key: string]: string },
  accessToken: string,
  successCallback: (data: any) => void
): Promise<void> => {
  try {
    const sanitizedData = Object.entries(postData).reduce((acc: { [key: string]: string }, [key, value]) => {
      acc[key] = DOMPurify.sanitize(value);
      return acc;
    }, {});

    if (!accessToken) {
      throw new Error('Please Login');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      withCredentials: true,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(postData),
      credentials: 'include',
    });

    const data: any = await handleResponse(response);
    successCallback(data);
  } catch (error) {
    console.error(error);
  }
};

export const getRequest = async (
  url: string,
  accessToken: string,
  successCallback: (data: any) => void
): Promise<void> => {
  try {
    if (!accessToken) {
      throw new Error('Please Login');
    }
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      withCredentials: true,
    };
    const response = await fetch(url, {
      method: 'GET',
      headers: config.headers,
      credentials: 'include',
    });
    const data: any = await handleResponse(response);
    successCallback(data);
  } catch (error) {
    console.error(error); 
  }
};

export const putRequest = async (
  url: string,
  putData: { [key: string]: string },
  accessToken: string,
  successCallback: (data: any) => void
): Promise<void> => {
  try {
    const sanitizedData = Object.entries(putData).reduce((acc: { [key: string]: string }, [key, value]) => {
      acc[key] = DOMPurify.sanitize(value);
      return acc;
    }, {});
    if (!accessToken) {
      throw new Error('Please Login');
    }
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      withCredentials: true,
    };
    const response = await fetch(url, {
      method: 'PUT',
      headers: config.headers,
      body: JSON.stringify(sanitizedData),
      credentials: 'include',
    });
    const data: any = await handleResponse(response);
    successCallback(data);
  } catch (error) {
    console.error(error);
  }
};
export const getNewAccessToken = async (refreshToken :string) => {
  try {
    const response = await fetch(`${process.env.JS_URI}/api/getAccessToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });
    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }
    const data = await response.json();
    setCookie("accessToken", data.accessToken, 1);
    setCookie("userName", data.userName, 1);
    return {userName:data.userName,accessToken:data.accessToken};
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};
