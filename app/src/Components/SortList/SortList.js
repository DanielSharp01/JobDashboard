import React from 'react';
import SortCriteria from '../SortCriteria/SortCriteria';
import "./SortList.scss";

export default function SortList({ orderBy = [
  { properties: ["Pay", "Hours"], selectedProperty: "Pay", direction: "Asc" },
  { properties: ["Pay", "Hours"], selectedProperty: "Hours", direction: "Asc" }
] }) {
  return <div className="sort-list">
    <h2>Order by</h2>
    {orderBy.map((sort, i) => <SortCriteria key={i} {...sort} upButton={i !== 0} downButton={i !== orderBy.length - 1} />)}
    <button className="add-element"><i className="fas fa-plus-circle"></i></button>
  </div>
}