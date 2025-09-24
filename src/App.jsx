// import React from "react";
// import Routing from "./Router";

// function App() {
//   return (
  
//       <Routing />
 
//   );
// }

// export default App;









import React, { useEffect, useContext } from "react";
import Routing from "./Routing";
import { auth } from "./Utility/firebase";
import { CartContext } from "./context/CartProvider";

function App() {
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("✅ Signed in:", authUser);
        dispatch({ type: "SET_USER", payload: authUser });
      } else {
        console.log("🚪 Signed out");
        dispatch({ type: "SET_USER", payload: null });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <Routing />;
}

export default App;