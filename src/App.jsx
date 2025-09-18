import React from "react";
import Routing from "./Router";
import { DataProvider } from "./context/DataProvider"; 
function App() {
  return (
    <DataProvider>
      <Routing />
    </DataProvider>
  );
}

export default App;
