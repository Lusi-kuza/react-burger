import React, { useEffect, useState } from "react";
import orderCardDetailsStyles from "./order-card-details.module.css";
import { useParams } from "react-router-dom";
import { TOrderCard } from "../../../utils/types";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import { transformDataForOrderCard } from "../../../utils/data";
import { BurgerPrice } from "../../burger-price/burger-price";
import { useSelector } from "../../../services/reducer";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date";
import { getOrderInfo } from "../../../utils/burger-api";
import { Preloader } from "../../preloader/preloader";

type TOrderCardDetailsProps = {
  inModal: boolean;
};

export const OrderCardDetails = ({
  inModal,
}: TOrderCardDetailsProps): JSX.Element => {
  const { INGREDIENTS_DATA } = useSelector((store) => store.ingredients);

  const { orderFeed } = useSelector((store) => store);
  const { orderFeedProfile } = useSelector((store) => store);

  const ingredientsForOrderCard = transformDataForOrderCard(INGREDIENTS_DATA);

  const { orderId } = useParams();
  const [orderInfo, setOrderInfo] = useState<TOrderCard>();

  let order =
    orderFeed.orders.find((el: TOrderCard) => el.number === Number(orderId)) ||
    orderFeedProfile.orders.find(
      (el: TOrderCard) => el.number === Number(orderId)
    ) ||
    orderInfo;

  useEffect(() => {
    const getOrder = async () => {
      await getOrderInfo(orderId || "").then((data) => {
        setOrderInfo({
          ingredients: data.orders[0].ingredients,
          _id: data.orders[0]._id,
          status: data.orders[0].status,
          createdAt: data.orders[0].createdAt,
          updatedAt: data.orders[0].updatedAt,
          number: data.orders[0].number,
          name: data.orders[0].name,
        });
      });
    };
    getOrder();
  }, [orderId]);

  const totalPrice: number =
    order?.ingredients.reduce(
      (sum: number, id: string) =>
        ingredientsForOrderCard[id].type === "bun"
          ? sum + 2 * ingredientsForOrderCard[id].price
          : sum + ingredientsForOrderCard[id].price,
      0
    ) || 0;

  return (
    <div className={orderCardDetailsStyles.card}>
      {!order && <Preloader />}
      {order && (
        <>
          <div
            className={
              inModal
                ? orderCardDetailsStyles.order_inModal
                : orderCardDetailsStyles.order_inPage
            }
          >
            #{order.number}
          </div>
          <div className={orderCardDetailsStyles.info}>
            <p className={orderCardDetailsStyles.title}>{order.name} </p>
            {order.status === "created" && (
              <p className={orderCardDetailsStyles.status_pending}>Создан</p>
            )}
            {order.status === "pending" && (
              <p className={orderCardDetailsStyles.status_pending}>Готовится</p>
            )}
            {order.status === "done" && (
              <p className={orderCardDetailsStyles.status_done}>Выполнен</p>
            )}
          </div>
          <p className={orderCardDetailsStyles.title}>Состав:</p>
          <ul className={orderCardDetailsStyles.list}>
            {order.ingredients.map((el, ind) => (
              <li key={ind} className={orderCardDetailsStyles.ingredients}>
                <IngredientIcon image={ingredientsForOrderCard[el].image} />
                <p className={orderCardDetailsStyles.name}>
                  {ingredientsForOrderCard[el].name}
                </p>
                <div className={orderCardDetailsStyles.cost}>
                  <p className={orderCardDetailsStyles.amount}>
                    {ingredientsForOrderCard[el].type === "bun" ? "2" : "1"}
                  </p>
                  <p className={orderCardDetailsStyles.amount}>x</p>
                  <BurgerPrice
                    price={ingredientsForOrderCard[el].price}
                    fontStyle="text_type_digits-default"
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className={orderCardDetailsStyles.total}>
            <p className={orderCardDetailsStyles.time}>
              <FormattedDate date={new Date(order.createdAt)} />
            </p>
            <BurgerPrice
              price={totalPrice}
              fontStyle="text_type_digits-default"
            />
          </div>
        </>
      )}
    </div>
  );
};
