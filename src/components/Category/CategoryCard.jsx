import React from "react";
import "./Category.css";

function CategoryCard({ data }) {
  return (
    <div className="category-card">
      <a href="#">
        <h2>{data.title}</h2>
        <img src={data.imgLink} alt={data.title} />
        <p>shop now</p>
      </a>
    </div>
  );
}

export default CategoryCard;
