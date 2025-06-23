import React from "react";

const COLORS = [
    "bg-blue-200 text-blue-800",
    "bg-green-200 text-green-800",
    "bg-yellow-200 text-yellow-800",
    "bg-pink-200 text-pink-800",
    "bg-purple-200 text-purple-800",
    "bg-red-200 text-red-800",
    "bg-indigo-200 text-indigo-800",
]

function getColorsClass(name: string) {

    let hash = 0;
    for(let i =0; i <name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return COLORS[Math.abs(hash) % COLORS.length];
}

const CategoryBadge: React.FC<{ name: string }> = ({ name }) => (
  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mr-1 mb-1 ${
    getColorsClass(name)
}`}>
    {name}
  </span>
);

export default CategoryBadge;