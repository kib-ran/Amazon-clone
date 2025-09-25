// import React from "react";
// import { useCart } from "../../context/CartProvider";
// import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
// import { Link } from "react-router-dom";
// import styles from "./Cart.module.css";

// function Cart() {
//   const { basket } = useCart();
//   const total = basket?.reduce((acc, item) => acc + item.price, 0) || 0;

//   return (
//     <div className={styles.cartPage}>
//       <h2 className={styles.heading}>Shopping Basket</h2>

//       {basket?.length > 0 ? (
//         <>
//           <div className={styles.cartItems}>
//             {basket.map((item) => (
//               <div key={item.id} className={styles.cartItem}>
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className={styles.image}
//                 />
//                 <div className={styles.details}>
//                   <h3 className={styles.title}>{item.title}</h3>
//                   <p className={styles.description}>{item.description}</p>
//                   <div className={styles.ratingRow}>
//                     <span className={styles.stars}>
//                       {"★".repeat(Math.round(item.rating))}
//                     </span>
//                     <span className={styles.reviewCount}>({item.reviews})</span>
//                   </div>
//                   <p className={styles.price}>${item.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className={styles.cartSummary}>
//             <h3>
//               Subtotal ({basket.length} items):{" "}
//               <strong>
//                 <CurrencyFormat
//                   value={total}
//                   displayType={"text"}
//                   thousandSeparator={true}
//                   prefix={"$"}
//                   renderText={(value) => value}
//                 />
//               </strong>
//             </h3>

//             <label className={styles.giftLabel}>
//               <input type="checkbox" className={styles.checkbox} />
//               This order contains a gift
//             </label>

//             <Link to="/payment" className={styles.checkoutLink}>
//               Continue to checkout
//             </Link>
//           </div>
//         </>
//       ) : (
//         <p className={styles.emptyMessage}>Oops! Your cart is empty.</p>
//       )}
//     </div>
//   );
// }

// export default Cart;

import React from "react";
import { useCart } from "../../context/CartProvider";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

function Cart() {
  const { basket } = useCart();

  const total = basket?.reduce((acc, item) => acc + item.price, 0) || 0;

  return (
    <div className={styles.cartPage}>
      <h2 className={styles.heading}>Shopping Basket</h2>

      {basket?.length > 0 ? (
        <>
          <div className={styles.cartItems}>
            {basket.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                />
                <div className={styles.details}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                  <div className={styles.ratingRow}>
                    <span className={styles.stars}>
                      {"★".repeat(Math.round(item.rating))}
                    </span>
                    <span className={styles.reviewCount}>
                      ({item.reviews || 0})
                    </span>
                  </div>
                  <p className={styles.price}>${item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <h3>
              Subtotal ({basket.length} items):{" "}
              <strong>
                <CurrencyFormat
                  value={total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  renderText={(value) => value}
                />
              </strong>
            </h3>

            <label className={styles.giftLabel}>
              <input type="checkbox" className={styles.checkbox} />
              This order contains a gift
            </label>

            <Link
              to="/payment"
              state={{ basket, total }}
              className={styles.checkoutLink}
            >
              Continue to checkout
            </Link>
          </div>
        </>
      ) : (
        <p className={styles.emptyMessage}>Oops! Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
