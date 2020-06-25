import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductById } from "../../actions/productsAction";
import { getOwnerProduct } from "../../actions/userAction";
import LoadingScreen from "../components/spinner/LoadingScreen";
import Header from "../components/Header/Header";
import Details from "./Details";
import Images from "./Images";
import Footer from "../components/Footer/Footer";

class SingleProduct extends Component {
  async componentDidMount() {
    await this.props.getProductById({ byId: this.props.match.params.id });
    if (this.props.product.user_id) {
      await this.props.getOwnerProduct(this.props.product.user_id);
    }
  }

  render() {
    const { loading, product, ownerProduct } = this.props;

    return (
      <>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <Header backgroundColor="black" />
            <div className={"container singleProduct"}>
              <div className="singleProduct__inner p-4">
                <div className="row">
                  <Images images={product.images} />
                  <Details product={product} user={ownerProduct} />
                </div>
              </div>
            </div>
            <Footer />
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  product: state.products.product,
  loading: state.products.loading,
  ownerProduct: state.user.ownerProduct,
});
export default connect(mapStateToProps, { getProductById, getOwnerProduct })(
  SingleProduct
);
