import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_ALL_INGREDIENTS,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from "./actions";
import { constructorReducer, initialState } from "./reducer";

describe("REDUCER --- CONSTRUCTOR-INGREDIENTS", () => {
  const someState = {
    bun: null,
    ingredient: [
      {
        _id: "60666c42cc7b410027a1a9b7",
        name: "Соус Spicy-X",
        type: "sauce",
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: "https://code.s3.yandex.net/react/code/sauce-02.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        __v: 0,
        id_for_key: "f999b7cc-d228-4ef3-8181-495d82184d02",
      },
      {
        _id: "60666c42cc7b410027a1a9b4",
        name: "Мясо бессмертных моллюсков Protostomia",
        type: "main",
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: "https://code.s3.yandex.net/react/code/meat-02.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
        __v: 0,
        id_for_key: "737edbf5-8829-435c-8ff7-9458d01be3d1",
      },
      {
        _id: "60666c42cc7b410027a1a9bd",
        name: "Кристаллы марсианских альфа-сахаридов",
        type: "main",
        proteins: 234,
        fat: 432,
        carbohydrates: 111,
        calories: 189,
        price: 762,
        image: "https://code.s3.yandex.net/react/code/core.png",
        image_mobile: "https://code.s3.yandex.net/react/code/core-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/core-large.png",
        __v: 0,
        id_for_key: "737edbf5-8829-435c-8ff7-9458d01be3d5",
      },
    ],
  };

  it("should return the initial state", () => {
    expect(constructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should return state with new bun", () => {
    const bun = {
      _id: "60666c42cc7b410027a1a9b1",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    };
    expect(
      constructorReducer(undefined, {
        type: ADD_BUN,
        payload: bun,
      })
    ).toEqual({ ...initialState, bun: bun });
  });

  it("should return state with filling", () => {
    const filling = {
      _id: "60666c42cc7b410027a1a9b5",
      name: "Говяжий метеорит (отбивная)",
      type: "main",
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: "https://code.s3.yandex.net/react/code/meat-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
      __v: 0,
      id_for_key: "4d05f2c8-fbbd-4ed3-9c9a-4a1849fc5c18",
    };
    expect(
      constructorReducer(initialState, {
        type: ADD_INGREDIENT,
        payload: filling,
      })
    ).toEqual({
      ...initialState,
      ingredient: [...initialState.ingredient, filling],
    });
  });

  it("should return state with  next filling", () => {
    const filling = {
      _id: "60666c42cc7b410027a1a9bc",
      name: "Плоды Фалленианского дерева",
      type: "main",
      proteins: 20,
      fat: 5,
      carbohydrates: 55,
      calories: 77,
      price: 874,
      image: "https://code.s3.yandex.net/react/code/sp_1.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sp_1-large.png",
      __v: 0,
      id_for_key: "4888b5e9-b5fa-4b99-aa77-71d5fa497cd2",
    };
    expect(
      constructorReducer(someState, {
        type: ADD_INGREDIENT,
        payload: filling,
      })
    ).toEqual({
      ...someState,
      ingredient: [...someState.ingredient, filling],
    });
  });

  it("should return state without deleted filling", () => {
    const deletedFilling = {
      _id: "60666c42cc7b410027a1a9b4",
      name: "Мясо бессмертных моллюсков Protostomia",
      type: "main",
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: "https://code.s3.yandex.net/react/code/meat-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
      __v: 0,
      id_for_key: "737edbf5-8829-435c-8ff7-9458d01be3d1",
    };
    expect(
      constructorReducer(someState, {
        type: DELETE_INGREDIENT,
        payload: deletedFilling,
      })
    ).toEqual({
      bun: null,
      ingredient: [
        {
          _id: "60666c42cc7b410027a1a9b7",
          name: "Соус Spicy-X",
          type: "sauce",
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: "https://code.s3.yandex.net/react/code/sauce-02.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          image_large:
            "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          __v: 0,
          id_for_key: "f999b7cc-d228-4ef3-8181-495d82184d02",
        },
        {
          _id: "60666c42cc7b410027a1a9bd",
          name: "Кристаллы марсианских альфа-сахаридов",
          type: "main",
          proteins: 234,
          fat: 432,
          carbohydrates: 111,
          calories: 189,
          price: 762,
          image: "https://code.s3.yandex.net/react/code/core.png",
          image_mobile: "https://code.s3.yandex.net/react/code/core-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/core-large.png",
          __v: 0,
          id_for_key: "737edbf5-8829-435c-8ff7-9458d01be3d5",
        },
      ],
    });
  });

  it("should return state with a changed sequence of filling", () => {
    expect(
      constructorReducer(someState, {
        type: MOVE_INGREDIENT,
        payload: {
          dragIndex: 2,
          hoverIndex: 0,
        },
      })
    ).toEqual({
      bun: null,
      ingredient: [
        {
          _id: "60666c42cc7b410027a1a9bd",
          name: "Кристаллы марсианских альфа-сахаридов",
          type: "main",
          proteins: 234,
          fat: 432,
          carbohydrates: 111,
          calories: 189,
          price: 762,
          image: "https://code.s3.yandex.net/react/code/core.png",
          image_mobile: "https://code.s3.yandex.net/react/code/core-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/core-large.png",
          __v: 0,
          id_for_key: "737edbf5-8829-435c-8ff7-9458d01be3d5",
        },

        {
          _id: "60666c42cc7b410027a1a9b4",
          name: "Мясо бессмертных моллюсков Protostomia",
          type: "main",
          proteins: 433,
          fat: 244,
          carbohydrates: 33,
          calories: 420,
          price: 1337,
          image: "https://code.s3.yandex.net/react/code/meat-02.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
          image_large:
            "https://code.s3.yandex.net/react/code/meat-02-large.png",
          __v: 0,
          id_for_key: "737edbf5-8829-435c-8ff7-9458d01be3d1",
        },
        {
          _id: "60666c42cc7b410027a1a9b7",
          name: "Соус Spicy-X",
          type: "sauce",
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: "https://code.s3.yandex.net/react/code/sauce-02.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          image_large:
            "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          __v: 0,
          id_for_key: "f999b7cc-d228-4ef3-8181-495d82184d02",
        },
      ],
    });
  });

  it("should return state without all ingredients  and bun (return the initial state)", () => {
    expect(
      constructorReducer(initialState, { type: DELETE_ALL_INGREDIENTS })
    ).toEqual(initialState);
  });
});
