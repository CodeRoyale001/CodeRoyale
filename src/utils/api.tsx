import DOMPurify from 'dompurify';

interface ApiResponse {
  message?: string;
}

const handleResponse = async (response: Response): Promise<ApiResponse> => {
  if (response.ok) {
    const data: ApiResponse = await response.json();
    console.log(data);
    return data;
  } else {
    const error: ApiResponse = await response.json();
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const loginReq = async (
  url: string,
  postData: { [key: string]: string },
  accessToken: string,
  successCallback: (data: ApiResponse) => void
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
      withCredentials: true,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(sanitizedData),
      credentials: 'include',
    });

    const data: ApiResponse = await handleResponse(response);
    successCallback(data);
  } catch (error) {
    throw error;
  }
};

export const postRequest = async (
  url: string,
  postData: { [key: string]: string },
  accessToken: string,
  successCallback: (data: ApiResponse) => void
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
      body: JSON.stringify(sanitizedData),
      credentials: 'include',
    });

    const data: ApiResponse = await handleResponse(response);
    successCallback(data);
  } catch (error) {
    console.error(error);
  }
};

export const getRequest = async (
  url: string,
  accessToken: string,
  successCallback: (data: ApiResponse) => void
): Promise<void> => {
  // getRequest implementation here, similar to postRequest
};

export const putRequest = async (
  url: string,
  putData: { [key: string]: string },
  accessToken: string,
  successCallback: (data: ApiResponse) => void
): Promise<void> => {
  // putRequest implementation here, similar to postRequest
};
