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

type TOrderIngredientsInfo = {
  product: {
    [id: string]: number;
  };
  totalPrice: number;
};

export const OrderCardDetails = ({
  inModal,
}: TOrderCardDetailsProps): JSX.Element => {
  const { INGREDIENTS_DATA } = useSelector((store) => store.ingredients);

  const orderFeedData = useSelector((store) => store.orderFeed.orders);

  const orderFeedProfileData = useSelector(
    (store) => store.orderFeedProfile.orders
  );

  const ingredientsForOrderCard = transformDataForOrderCard(INGREDIENTS_DATA);

  const { orderId } = useParams();
  const [orderInfo, setOrderInfo] = useState<TOrderCard>();

  let order =
    orderFeedData.find((el: TOrderCard) => el.number === Number(orderId)) ||
    orderFeedProfileData.find(
      (el: TOrderCard) => el.number === Number(orderId)
    ) ||
    orderInfo;

  useEffect(() => {
    const getOrder = async () => {
      await getOrderInfo(orderId || "").then((data) => {
        const order = data.orders[0];
        setOrderInfo({
          ingredients: order.ingredients,
          _id: order._id,
          status: order.status,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          number: order.number,
          name: order.name,
        });
      });
    };
    getOrder();
  }, [orderId]);

  const orderIngredientsInfo: TOrderIngredientsInfo | undefined =
    order?.ingredients.reduce(
      (obj: TOrderIngredientsInfo, id: string) => {
        if (ingredientsForOrderCard[id].type === "bun") {
          obj.totalPrice =
            obj.totalPrice + 2 * ingredientsForOrderCard[id].price;
          if (obj.product[id]) {
            obj.product[id] = obj.product[id] + 2;
          } else {
            obj.product[id] = 2;
          }
        } else {
          obj.totalPrice = obj.totalPrice + ingredientsForOrderCard[id].price;

          if (obj.product[id]) {
            obj.product[id] = obj.product[id] + 1;
          } else {
            obj.product[id] = 1;
          }
        }
        return obj;
      },
      {
        product: {},
        totalPrice: 0,
      }
    );

  return (
    <div className={orderCardDetailsStyles.card}>
      {!order && <Preloader />}
      {order && orderIngredientsInfo && (
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
            {Object.entries(orderIngredientsInfo.product).map((el, ind) => (
              <li key={ind} className={orderCardDetailsStyles.ingredients}>
                <IngredientIcon image={ingredientsForOrderCard[el[0]].image} />
                <p className={orderCardDetailsStyles.name}>
                  {ingredientsForOrderCard[el[0]].name}
                </p>
                <div className={orderCardDetailsStyles.cost}>
                  <p className={orderCardDetailsStyles.amount}>{el[1]}</p>
                  <p className={orderCardDetailsStyles.amount}>x</p>
                  <BurgerPrice
                    price={ingredientsForOrderCard[el[0]].price}
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
              price={orderIngredientsInfo?.totalPrice}
              fontStyle="text_type_digits-default"
            />
          </div>
        </>
      )}
    </div>
  );
};
