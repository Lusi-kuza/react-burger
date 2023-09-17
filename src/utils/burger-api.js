const mainUrl = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const sendRequest = (url, options) =>
  fetch(`${mainUrl}${url}`, options).then(checkResponse);
