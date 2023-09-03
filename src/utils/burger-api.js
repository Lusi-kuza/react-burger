const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getData = (url) => fetch(url).then(checkResponse);
