export const setCookie = (key: string, data: string, expiration: number): void => {
    const sanitizedKey = encodeURIComponent(key);
    const sanitizedData = encodeURIComponent(data);
    const date = new Date();
    date.setTime(date.getTime() + expiration * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    const secure = 'secure'; // Add 'secure' flag for secure cookies
    document.cookie = `${sanitizedKey}=${sanitizedData}; ${expires}; path=/; ${secure}`;
};

export const getCookie = (key: string): string => {
    const name = `${key}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
};

export const deleteCookie = (key: string): void => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};