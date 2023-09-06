const mainUrl = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getProduct = () =>
  fetch(`${mainUrl}/ingredients`).then(checkResponse);

export const getOrder = (data) =>
  fetch(`${mainUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ingredients: [data.bun._id, ...data.ingredient.map((el) => el._id)],
    }),
  }).then(checkResponse);
