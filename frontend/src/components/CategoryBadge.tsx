import React from "react";

const CategoryBadge: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <span 
    className="inline-block px-2 py-1 rounded text-xs font-semibold mr-1 mb-1"
    style={{ backgroundColor: color , color: "#222"}}
  >
    {name}
  </span>
);

export default CategoryBadge;