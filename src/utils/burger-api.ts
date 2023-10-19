import {
  TForm,
  TOrder,
  TRefreshToken,
  TRegister,
  TReset,
  TResponse,
  TUserInfo,
} from "./types";

interface TOptions extends RequestInit {
  headers: HeadersInit & {
    authorization?: string;
  };
}

const mainUrl = "https://norma.nomoreparties.space/api";

const checkResponse = (res: Response): Promise<any> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const sendRequest = (url: string, options: TOptions): Promise<any> =>
  fetch(`${mainUrl}${url}`, options).then(checkResponse);

const refreshTokenRequest = (): Promise<TRefreshToken> => {
  return sendRequest("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

const fetchWithRefresh = async (
  url: string,
  options: TOptions
): Promise<any> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshTokenRequest();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const sendRequestFetchWithRefresh = (
  url: string,
  options: TOptions
): Promise<any> => fetchWithRefresh(`${mainUrl}${url}`, options);

export const registerRequest = (form: TForm): Promise<TRegister> => {
  return sendRequest("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
      name: form.name,
    }),
  });
};

export const loginRequest = (form: Omit<TForm, "name">): Promise<TRegister> => {
  return sendRequest("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  });
};

export const logoutRequest = (): Promise<TResponse> => {
  return sendRequest("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const getPasswordRequest = (
  form: Pick<TForm, "email">
): Promise<TResponse> => {
  return sendRequest("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: form.email,
    }),
  });
};

export const resetPasswordRequest = (form: TReset): Promise<TResponse> => {
  return sendRequest("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      password: form.password,
      token: form.token,
    }),
  });
};

export const getUserInfoRequest = (): Promise<TUserInfo> => {
  return sendRequestFetchWithRefresh("/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken") || "",
    },
  });
};

export const updateUserInfoRequest = (form: TForm): Promise<TUserInfo> => {
  return sendRequestFetchWithRefresh("/auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken") || "",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
      name: form.name,
    }),
  });
};

export const getOrderRequest = (dataSend: Array<string>): Promise<TOrder> => {
  return sendRequestFetchWithRefresh("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken") || "",
    },
    body: JSON.stringify({
      ingredients: dataSend,
    }),
  });
};
