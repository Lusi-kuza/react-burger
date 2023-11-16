import React from "react";

import orderDetailsStyles from "./order-details.module.css";
import logo from "../../../images/graphics.svg";

type TOrderDetailsProps = {
  order: number;
};

const OrderDetails = ({ order }: TOrderDetailsProps): JSX.Element => {
  return (
    <div className={orderDetailsStyles.order}>
      <p
        className={`${orderDetailsStyles.order_number} text_type_digits-large mt-4 mb-8`}
        data-testid="orderNumber"
      >
        {order}
      </p>
      <p className="text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={orderDetailsStyles.logo}>
        <img src={logo} alt="логотип" />
      </div>
      <p className="text_type_main-default mb-2 mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export { OrderDetails };
