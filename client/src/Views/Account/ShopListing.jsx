import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductsList } from "../../actions/productsAction";
import LoadingScreen from "../components/spinner/LoadingScreen";

class ShopListing extends Component {
  componentDidMount() {
    const { user, getProductsList } = this.props;
    if (user) getProductsList(user._id);
  }

  buildListProducts = (arr) => {
    return arr.map((product, i) => {
      return (
        <tr key={i}>
          <td className={"text-center"}>
            <Link
              to={`/my-shop/editProduct/${product._id}`}
              style={{ color: "#000" }}
            >
              <i className="fa fa-edit" title="Edit" />
            </Link>
          </td>
          <td>{product.name}</td>
          <td>{product.category}</td>
          <td>{product.brand}</td>
          <td>{product.color}</td>
          <td>{product.size}</td>
          <td>$ {product.price}</td>
        </tr>
      );
    });
  };

  render() {
    const { productsByUser, loading } = this.props;

    if (loading) {
      return <LoadingScreen />;
    }
    return (
      <div
        className="tab-content__listing tab-pane fade active show"
        id="nav-contact"
        role="tabpanel"
        aria-labelledby="nav-contact-tab"
      >
        <h1>Selling Products</h1>
        <div className="m-3 text-right">
          <Link to="/my-shop/add_product">Add Product</Link>
        </div>
        {productsByUser.length ? (
          <table
            id="example"
            className="table table-striped table-bordered"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Edit</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{this.buildListProducts(productsByUser)}</tbody>
            <tfoot>
              <tr>
                <th>Edit</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
              </tr>
            </tfoot>
          </table>
        ) : (
          <h2>You have no items for sale.</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productsByUser: state.products.productsByUser,
  user: state.user.user,
  loading: state.products.loading,
});

export default connect(mapStateToProps, { getProductsList })(ShopListing);
