import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { db } from "../../Utility/firebase";
import { CartContext } from "../../Context/CartProvider";
import classes from "./Orders.module.css";
import { ClipLoader } from "react-spinners";

function Orders() {
  const { user } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await db
          .collection("users")
          .doc(user?.uid)
          .collection("orders")
          .orderBy("created", "desc")
          .get();

        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchOrders();
    }
  }, [user]);

  return (
    // <Layout>
    <section className={classes.orders_container}>
      <h2>Your Orders</h2>
      <hr />

      {loading ? (
        <div className={classes.spinnerWrapper}>
          <ClipLoader size={30} color="#f0c14b" />
        </div>
      ) : orders.length === 0 ? (
        <p className={classes.empty}>You don't have any orders yet.</p>
      ) : (
        <div className={classes.ordersList}>
          {orders.map((order) => (
            <div key={order.id} className={classes.orderCard}>
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Total:</strong> ${(order.amount / 100).toFixed(2)}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.created * 1000).toLocaleString()}
              </p>
              <div className={classes.items}>
                {order.basket.map((item, index) => (
                  <div key={index} className={classes.item}>
                    <img src={item.image} alt={item.title} />
                    <div>
                      <p>{item.title}</p>
                      <p>${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
    /* </Layout> */
  );
}

export default Orders;
