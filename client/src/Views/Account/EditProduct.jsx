import React from "react";
import ProductForm from "../components/ProductForm/ProductForm";
import { connect } from "react-redux";
import { updateProductById } from "../../actions/productsAction";

function EditProduct(props) {
  const productId = props.match.params.id;
  return (
    <div>
      <ProductForm
        title="Edit Product"
        id={productId}
        savedProduct={props.updateProductById}
      />
    </div>
  );
}

export default connect(null, { updateProductById })(EditProduct);
