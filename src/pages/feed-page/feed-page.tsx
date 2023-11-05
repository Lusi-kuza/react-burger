import React, { useEffect } from "react";
import feedPageStyle from "./feed-page.module.css";

import { OrderCard } from "../../components/order-card/order-card";
import { TOrderCard } from "../../utils/types";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/reducer";
import { connect } from "../../services/order-feed/actions";
import { FEED_PAGE_SERVER_URL } from "../../utils/burger-api";

type TOrdersStatus = {
  done: Array<number>;
  pending: Array<number>;
};

const FeedPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { orderFeed } = useSelector((store) => store);

  useEffect(() => {
    dispatch(connect(FEED_PAGE_SERVER_URL));
  }, [dispatch]);

  const ordersStatus = orderFeed.orders.reduce(
    (obj: TOrdersStatus, order: TOrderCard) => {
      if (order.status === "done" && obj.done.length < 20) {
        obj.done.push(order.number);
      }
      if (order.status === "pending" && obj.pending.length < 20) {
        obj.pending.push(order.number);
      }
      return obj;
    },
    {
      done: [],
      pending: [],
    }
  );

  const location = useLocation();

  return (
    <div>
      <div className={feedPageStyle.content}>Лента заказов</div>
      <main className={feedPageStyle.main}>
        <div className={feedPageStyle.orders}>
          <ul className={feedPageStyle.list_orders}>
            {orderFeed.orders.map((el) => (
              <li key={el._id} className={feedPageStyle.item}>
                <Link
                  to={`/feed/${el.number}`}
                  state={{ background: location }}
                  className={feedPageStyle.link}
                >
                  <OrderCard order={el} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={feedPageStyle.statistics}>
          <div className={feedPageStyle.orders_board}>
            <div className={feedPageStyle.status}>
              <p className={feedPageStyle.title}>Готовы:</p>
              <ul className={feedPageStyle.list_status}>
                {ordersStatus.done.map((el) => (
                  <li key={el} className={feedPageStyle.order_done}>
                    {el}
                  </li>
                ))}
              </ul>
            </div>
            <div className={feedPageStyle.status}>
              <p className={feedPageStyle.title}>В работе:</p>
              <ul className={feedPageStyle.list_status}>
                {ordersStatus.pending.map((el) => (
                  <li key={el} className={feedPageStyle.order_pending}>
                    {el}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p className={feedPageStyle.title}>Выполнено за все время:</p>
            <p className={feedPageStyle.count}>{orderFeed.total}</p>
          </div>
          <div>
            <p className={feedPageStyle.title}>Выполнено за сегодня:</p>
            <p className={feedPageStyle.count}>{orderFeed.totalToday}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export { FeedPage };
