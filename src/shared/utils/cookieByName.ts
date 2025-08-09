export const getCookieByName = (name: string) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim(); // Remove leading/trailing whitespace

    // Check if this cookie starts with the desired name followed by '='
    if (cookie.startsWith(name + '=')) {
      // Extract and return the value part of the cookie
      return cookie.substring(name.length + 1);
    }
  }
  return null; // Return null if the cookie is not found
};
