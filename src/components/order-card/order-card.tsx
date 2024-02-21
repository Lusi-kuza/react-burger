import React from "react";
import orderCardStyle from "./order-card.module.css";
import { TOrderCard } from "../../utils/types";
import { BurgerPrice } from "../burger-price/burger-price";
import { IngredientIcon } from "./ingredient-icon/ingredient-icon";
import { transformDataForOrderCard } from "../../utils/data";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date";
import { useSelector } from "../../services/reducer";

type TOrderCardProps = {
  order: TOrderCard;
  showStatus?: boolean;
};

type TObjectForOrderCard = {
  image: Array<string>;
  price: number;
};

const OrderCard = ({ order, showStatus }: TOrderCardProps): JSX.Element => {
  const { INGREDIENTS_DATA } = useSelector((store) => store.ingredients);

  const ingredientsForOrderCard = transformDataForOrderCard(INGREDIENTS_DATA);

  const objectForOrderCard = order.ingredients.reduce(
    (obj: TObjectForOrderCard, id: string) => {
      if (id === null) return obj;
      obj.image.push(ingredientsForOrderCard[id].image);
      if (ingredientsForOrderCard[id].type === "bun") {
        obj.price = obj.price + 2 * ingredientsForOrderCard[id].price;
      } else {
        obj.price = obj.price + ingredientsForOrderCard[id].price;
      }
      return obj;
    },
    {
      image: [],
      price: 0,
    }
  );

  return (
    <div className={orderCardStyle.card}>
      <div className={orderCardStyle.info}>
        <p className={orderCardStyle.number}>{`#${order.number}`}</p>
        <p className={orderCardStyle.time}>
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </div>
      <div>
        <p className={orderCardStyle.title}>{order.name}</p>
        {showStatus && order.status === "created" && (
          <p className={orderCardStyle.status_pending}>Создан</p>
        )}
        {showStatus && order.status === "pending" && (
          <p className={orderCardStyle.status_pending}>Готовится</p>
        )}
        {showStatus && order.status === "done" && (
          <p className={orderCardStyle.status_done}>Выполнен</p>
        )}
      </div>
      <div className={orderCardStyle.info}>
        <ul className={orderCardStyle.list}>
          {objectForOrderCard.image.map((el, ind, arr) =>
            ind < 6 ? (
              <li
                key={ind}
                className={orderCardStyle.ingredients}
                style={{ zIndex: 6 - ind }}
              >
                <IngredientIcon
                  image={el}
                  hiddenIngredient={ind === 5 && arr[6] ? arr.length - 6 : null}
                />
              </li>
            ) : null
          )}
        </ul>
        <BurgerPrice
          price={objectForOrderCard.price}
          fontStyle="text_type_digits-default"
        />
      </div>
    </div>
  );
};

export { OrderCard };
