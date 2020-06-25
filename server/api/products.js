const builder = (queries) => {
  const {
    name,
    minPrice,
    maxPrice,
    size,
    color,
    brand,
    details,
    gender,
    condition,
    category,
  } = queries;

  return {
    name: { $regex: new RegExp(`${name ? name : ""}`, "i") },
    price: {
      $gte: `${minPrice ? minPrice : 0}`,
      $lte: `${maxPrice ? maxPrice : null}`,
    },
    size: { $regex: new RegExp(`${size ? size : ""}`, "i") },
    color: { $regex: new RegExp(`${color ? color : ""}`, "i") },
    brand: { $regex: new RegExp(`${brand ? brand : ""}`, "i") },
    details: { $regex: new RegExp(`${details ? details : ""}`, "i") },
    gender: { $regex: new RegExp(`${gender ? "^" + gender : ""}`, "i") },
    condition: { $regex: new RegExp(`${condition ? condition : ""}`, "i") },
    category: { $regex: new RegExp(`${category ? category : ""}`, "i") },
  };
};

module.exports = { builder };
