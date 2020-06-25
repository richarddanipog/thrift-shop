import React from "react";
import ProductForm from "../components/ProductForm/ProductForm";
import { connect } from "react-redux";
import { addProduct } from "../../actions/productsAction";

const AddProduct = ({ addProduct }) => {
  return (
    <div>
      <ProductForm title="Add Product" savedProduct={addProduct} />
    </div>
  );
};

export default connect(null, { addProduct })(AddProduct);
