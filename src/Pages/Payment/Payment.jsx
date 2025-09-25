// import React, { useState } from "react";
// import styles from "./Payment.module.css";
// import { useCart } from "../../context/CartProvider";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import axiosInstance from "../../Api/axios";
// const Payment = () => {
//   const { basket, user } = useCart();
//   const stripe = useStripe();
//   const elements = useElements();

//   const [cardError, setCardError] = useState("");
//   const [cardComplete, setCardComplete] = useState(false);

//   const totalItems = basket?.reduce((sum, item) => sum + (item.amount || 1), 0);

//   const subtotal = basket
//     ?.reduce((sum, item) => sum + (item.price || 0) * (item.amount || 1), 0)
//     .toFixed(2);

//   const handleChange = (e) => {
//     console.log("CardElement change event:", e);
//     if (e.error) {
//       setCardError(e.error.message);
//     } else {
//       setCardError("");
//     }
//     setCardComplete(e.complete);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     const cardElement = elements.getElement(CardElement);

//     const result = await stripe.confirmCardPayment("your-client-secret", {
//       payment_method: {
//         card: cardElement,
//         billing_details: {
//           email: user?.email || "guest@example.com",
//         },
//       },
//     });

//     if (result.error) {
//       console.error("Payment failed:", result.error.message);
//       setCardError(result.error.message);
//     } else {
//       console.log("Payment succeeded:", result.paymentIntent);
//     }
//   };

//   return (
//     <div className={styles.paymentWrapper}>
//       <div className={styles.paymentContent}>
//         {/* Header */}
//         <div className={styles.checkoutHeader}>
//           <h1>Checkout ({totalItems} items)</h1>
//         </div>

//         {/* Delivery Address */}
//         <section className={styles.section}>
//           <h2 className={styles.sectionTitle}>Delivery Address</h2>
//           <div className={styles.addressBlock}>
//             <p>{user?.email || "guest@example.com"}</p>
//             <p>123 React Lane</p>
//             <p>Chicago, IL</p>
//           </div>
//         </section>

//         {/* Review Items */}
//         <section className={styles.section}>
//           <h2 className={styles.sectionTitle}>Review Items and Delivery</h2>
//           <div className={styles.itemList}>
//             {basket.map((item, index) => (
//               <div key={index} className={styles.itemCard}>
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className={styles.itemImage}
//                 />
//                 <div className={styles.itemInfo}>
//                   <p className={styles.itemTitle}>
//                     {item.amount || 1} × {item.title}
//                   </p>
//                   <p className={styles.itemRating}>
//                     Rating: {item.rating?.toFixed(1)} ({item.reviews} reviews)
//                   </p>
//                   <p className={styles.itemPrice}>
//                     ${item.price ? item.price.toFixed(2) : "0.00"}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Payment Form */}
//         <section className={styles.section}>
//           <h2 className={styles.sectionTitle}>Payment Methods</h2>
//           <form onSubmit={handleSubmit} autoComplete="off">
//             <CardElement
//               className={styles.cardElement}
//               onChange={handleChange}
//               options={{
//                 style: {
//                   base: {
//                     fontSize: "16px",
//                     color: "#32325d",
//                     "::placeholder": { color: "#aab7c4" },
//                   },
//                 },
//                 // disableAutofill: true,
//                 // hidePostalCode: true,
//               }}
//             />
//             {cardError && <p className={styles.cardError}> {cardError}</p>}
//             <div className={styles.paymentFooter}>
//               <p className={styles.totalText}>
//                 Total Order: <strong>${subtotal}</strong>
//               </p>
//               <button
//                 className={styles.payButton}
//                 disabled={!stripe || !cardComplete}
//               >
//                 Pay Now
//               </button>
//             </div>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Payment;

import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/axios";
import styles from "./Payment.module.css";
import { useCart } from "../../Context/CartProvider";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
function Payment() {
  const { basket, user, dispatch } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [loading, setLoading] = useState(false);

  const getSubtotal = (basket) =>
    basket?.reduce((amount, item) => amount + item.price, 0);

  const handleChange = (e) => {
    setCardError(e.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setCardError("");
    setLoading(true);

    const subtotal = getSubtotal(basket);
    const total = Math.round(subtotal * 100);

    if (total <= 0) {
      setCardError("Your cart is empty or subtotal is invalid.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total}`,
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "json",
      });

      const clientSecret = response.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user?.email || "kibran@example.com",
          },
        },
      });

      if (result.error) {
        setCardError(result.error.message);
        setLoading(false);
        return;
      }

      const paymentIntent = result.paymentIntent;

      // ✅ Save order to Firestore using paymentIntent.id
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      dispatch({ type: "EMPTY_BASKET" });
      setLoading(false);
      navigate("/orders");
    } catch (error) {
      console.error("Payment error:", error.message);
      setCardError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };
  return (
    <div className={styles.paymentWrapper}>
      <div className={styles.paymentContent}>
        <div className={styles.checkoutHeader}>
          <h1>Checkout ({basket?.length || 0}) items</h1>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Delivery Address</h2>
          <div className={styles.addressBlock}>
            <p>{user?.email || "kibran@example.com"}</p>
            <p>ethiopia</p>
            <p>dz</p>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Review Items and Delivery</h2>
          <div className={styles.itemList}>
            {basket?.map((item, index) => (
              <div key={index} className={styles.itemCard}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemRating}>
                    ⭐ {item.rating} ({item.reviews} reviews)
                  </p>
                  <p className={styles.itemPrice}>${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handlePayment} autoComplete="off">
          <CardElement className={styles.cardElement} onChange={handleChange} />
          {cardError && <div className={styles.cardError}>{cardError}</div>}

          <div className={styles.paymentFooter}>
            <p className={styles.totalText}>
              Your Order: ${getSubtotal(basket).toFixed(2)}
            </p>
            <button className={styles.payButton} disabled={!stripe || loading}>
              {loading ? (
                <div className={styles.spinnerWrapper}>
                  <ClipLoader size={20} color="#2c2a25ff" />
                </div>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
