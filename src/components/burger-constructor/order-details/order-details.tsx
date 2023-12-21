import React from "react";

import orderDetailsStyles from "./order-details.module.css";
import logo from "../../../images/graphics.svg";

type TOrderDetailsProps = {
  order: number;
};

const OrderDetails = ({ order }: TOrderDetailsProps): JSX.Element => {
  return (
    <div className={orderDetailsStyles.order}>
      <p className={orderDetailsStyles.order_number} data-testid="orderNumber">
        {order}
      </p>
      <p className={orderDetailsStyles.order_id}>идентификатор заказа</p>
      <div className={orderDetailsStyles.logo}>
        <img src={logo} alt="логотип" />
      </div>
      <p className={orderDetailsStyles.info_active}>
        Ваш заказ начали готовить
      </p>
      <p className={orderDetailsStyles.info_inactive}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export { OrderDetails };
