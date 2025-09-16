import React from "react";
import numeral from "numeral";

function CurrencyFormat({ value, className }) {
  const formatted = numeral(value).format("$0,0.00");
  return <span className={className}>{formatted}</span>;
}

export default CurrencyFormat;
