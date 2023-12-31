import React, { useEffect } from "react";
import orderHistoryStyle from "./order-history.module.css";
import { OrderCard } from "../../order-card/order-card";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../../services/reducer";
import { FEED_PAGE_PROFILE_SERVER_URL } from "../../../utils/burger-api";
import {
  connectProfile,
  disconnectProfile,
} from "../../../services/order-feed-profile/actions";
import { TOrderCard } from "../../../utils/types";

const OrderHistory = (): JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orderFeedProfile.orders);

  useEffect(() => {
    dispatch(
      connectProfile(
        `${FEED_PAGE_PROFILE_SERVER_URL}?token=${localStorage
          .getItem("accessToken")
          ?.slice(7)}`
      )
    );
    return () => {
      dispatch(disconnectProfile());
    };
  }, [dispatch]);

  const location = useLocation();
  return (
    <div className={orderHistoryStyle.order}>
      <ul className={orderHistoryStyle.list_orders}>
        {orders.length > 0 &&
          orders.reduceRight(
            (arr: JSX.Element[], el: TOrderCard) => [
              ...arr,
              <li key={el._id} className={orderHistoryStyle.item}>
                <Link
                  to={`/profile/orders/${el.number}`}
                  state={{ background: location }}
                  className={orderHistoryStyle.link}
                >
                  <OrderCard order={el} showStatus={true} />{" "}
                </Link>
              </li>,
            ],
            []
          )}
      </ul>
    </div>
  );
};

export { OrderHistory };
