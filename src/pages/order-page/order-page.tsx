import React from "react";
import OrderPageStyle from "./order-page.module.css";
import { OrderCardDetails } from "../../components/order-card/order-card-details/order-card-details";

const OrderPage = (): JSX.Element => {
  return (
    <div className={OrderPageStyle.info}>
      <OrderCardDetails inModal={false} />
    </div>
  );
};

export { OrderPage };
