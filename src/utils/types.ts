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

export type TIngredientsRef = HTMLDivElement | null;

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

export type TBurgerConstructorProducts = TBurgerProducts & {
  id_for_key: string;
};

export type TBurgerCategory = {
  idCategory: number;
  nameCategory: string;
  products: Array<TBurgerProducts>;
  categoryRef: { current: TIngredientsRef };
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

export type TOrderCard = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  name: string;
};

export type TOrderInfo = {
  success: boolean;
  orders: [
    {
      ingredients: Array<string>;
      _id: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      number: number;
      name: string;
      owner: string;
      __v: number;
    }
  ];
};

export type TAllOrder = {
  success: boolean;
  orders: Array<TOrderCard>;
  total: number;
  totalToday: number;
};

export enum WebsocketStatus {
  CONNECTING = "CONNECTING",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}
