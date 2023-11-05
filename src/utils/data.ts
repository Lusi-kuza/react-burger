import React, { MutableRefObject } from "react";

import { TBurgerCategory, TBurgerProducts, TIngredientsRef } from "./types";

type TTransformObjectForOrderCard = {
  [id: string]: {
    image: string;
    price: number;
    name: string;
    type: string;
  };
};

type TIngredientsForCategory = {
  bun: TBurgerCategory;
  sauce: TBurgerCategory;
  main: TBurgerCategory;
};

export const transformDataForOrderCard = (
  data: Array<TBurgerProducts>
): TTransformObjectForOrderCard =>
  data.reduce((obj: TTransformObjectForOrderCard, item: TBurgerProducts) => {
    return (obj = {
      ...obj,
      [item._id]: {
        image: item.image_mobile,
        price: item.price,
        name: item.name,
        type: item.type,
      },
    });
  }, {});

export const transformDataForCategory = (
  data: Array<TBurgerProducts>,
  bunRef: MutableRefObject<TIngredientsRef>,
  sauceRef: MutableRefObject<TIngredientsRef>,
  mainRef: MutableRefObject<TIngredientsRef>
): TIngredientsForCategory =>
  data.reduce(
    (obj: TIngredientsForCategory, item: TBurgerProducts) => {
      if (item.type === "bun") {
        obj.bun.products.push(item);
      }
      if (item.type === "main") {
        obj.main.products.push(item);
      }
      if (item.type === "sauce") {
        obj.sauce.products.push(item);
      }
      return obj;
    },
    {
      bun: {
        idCategory: 1,
        nameCategory: "Булки",
        products: [],
        categoryRef: bunRef,
      },
      sauce: {
        idCategory: 2,
        nameCategory: "Соусы",
        products: [],
        categoryRef: sauceRef,
      },
      main: {
        idCategory: 3,
        nameCategory: "Начинки",
        products: [],
        categoryRef: mainRef,
      },
    }
  );
