// utils/api.js

import DOMPurify from 'dompurify';

const handleResponse = async (response) => {
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    const error = await response.json();
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const postRequest = async (url, postData, accessToken, successCallback) => {
  try {
    const sanitizedData = Object.entries(postData).reduce((acc, [key, value]) => {
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
      body: JSON.stringify(sanitizedData),
      credentials: 'include',
    });

    const data = await handleResponse(response);
    successCallback(data); // Invoke the success callback with the response data
  } catch (error) {
    console.error(error);
    // TODO: Handle error
  }
};

export const getRequest = async (url, accessToken, successCallback) => {
  try {
    if (!accessToken) {
      throw new Error('Please Login');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
      withCredentials: true,
    };

    const response = await fetch(url, {
      method: 'GET',
      headers: config.headers,
      credentials: 'include',
    });

    const data = await handleResponse(response);
    successCallback(data); // Invoke the success callback with the response data
  } catch (error) {
    console.error(error);
    // TODO: Handle error
  }
};

export const putRequest = async (url, putData, accessToken, successCallback) => {
  try {
    const sanitizedData = Object.entries(putData).reduce((acc, [key, value]) => {
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

    const data = await handleResponse(response);
    successCallback(data); // Invoke the success callback with the response data
  } catch (error) {
    console.error(error);
    // TODO: Handle error
  }
};