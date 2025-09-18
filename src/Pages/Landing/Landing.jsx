import React from "react";

import Carousel from "../../components/Carousel/Carousel";
import Category from "../../components/Category/Category";
import Product from "../../components/Product/Product";
import LayOut from "../../components/LayOut/LayOut";
import LowerHeader from "../../components/Header/LowerHeader";

function Landing() {
  return (
    <>
      <LowerHeader />
      <Carousel />
<Category/>
  
      <Product />
    </>
  );
}

export default Landing;
