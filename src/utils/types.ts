export type TRefreshToken = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

type TUser = TRefreshToken & {
  user: {
    email: string;
    name: string;
  };
};

export type TUserInfo = TUser & {
  success: boolean;
};

export type TRegister = TRefreshToken & TUser;

export type TResponse = {
  success: boolean;
  message: string;
};

export type TForm = {
  email: string;
  name: string;
  password: string;
};

export type TReset = {
  password: string;
  token: string;
};

export type TBurgerProducts = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TOrder = {
  success: boolean;
  name: string;
  order: {
    ingredients: Array<TBurgerProducts>;
    _id: string;
    owner: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
  };
};
