import { useEffect, useState, userState } from "react";
import StripeCheckout from 'react-stripe-checkout';
import Router from "next/router";
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: () => Router.push('/orders')
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    }
  }, [order]);

  if(timeLeft < 0) {
    return <div>Order Expired</div>
  }

  return <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout 
        token={({ id }) => console.log(id)}
        stripeKey="pk_test_51MxahkD894ssR9gPOZZy4iHlaJP9fHThxwjO4izsjsOmNIkFOOlQreGeTPCts8AEw8ydu2W6f3YJmy9Lo1Jzl4ZW00gSkTM9Sd"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>;
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
}

export default OrderShow;