import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getProducts,
  addQuery,
  delCurrentFilter,
} from "../../actions/productsAction";
import Header from "../components/Header/Header";
import SizeButton from "../components/GalleryNavbar/SizeButton";
import PriceButton from "../components/GalleryNavbar/PriceButton";
import CategoryButton from "../components/GalleryNavbar/CategoryButton";
import ConditionButton from "../components/GalleryNavbar/ConditionButton";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/spinner/LoadingScreen";
import Footer from "../components/Footer/Footer";

const Gallery = ({
  getProducts,
  products,
  loading,
  query,
  addQuery,
  delCurrentFilter,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts(query);
  }, [getProducts, query]);

  const onInputChange = (e, category) => {
    const { name, value } = e.target;
    category
      ? addQuery({ [name]: value, category })
      : addQuery({ [name]: value });
  };

  const cardProduct = (product, i) => {
    return (
      <div key={i} className="gallery__products--card col-lg-3 p-3 mt-4">
        <Link to={`/product/${product._id}`}>
          <div
            className="position-relative gallery__products--card-img"
            style={{
              backgroundImage: `url(http://localhost:3500/${product.images[0]})`,
            }}
          >
            <div className="gallery__products--card-detail">
              <span>
                {product.name.length > 15
                  ? `${product.name.slice(0, 15)}...`
                  : product.name}
              </span>
              <span>$ {product.price}</span>
              <span>{product.size}</span>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  const listOfProducts = (list) => {
    return (
      <div className="row gallery__products">
        {list.map((p, i) => cardProduct(p, i))}
      </div>
    );
  };

  const shuffle = (a) => {
    /**return shuffle off array and return it */
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const navFilterTop = (queries) => {
    let filters = [];
    for (let prop in queries) {
      filters.push(
        <span
          key={prop}
          className="mr-3"
          onClick={() => delCurrentFilter(prop)}
        >
          {prop} x
        </span>
      );
    }
    return filters;
  };

  return (
    <>
      <div>
        <Header backgroundColor={"black"} />
        <div
          id="galleryCover"
          style={{
            backgroundImage: "url(../../images/galleryCover.jpg)",
          }}
        >
          <h1>The Rise of Thrift Shopping</h1>
        </div>
        <div className="container gallery">
          <div className="gallery_topFilter">{navFilterTop(query)}</div>
          <div className="row">
            {/**Navbar filter */}
            <div className="col-lg-2 mt-5">
              <div id="accordion" className="gallery__filters">
                <SizeButton
                  onInputChange={onInputChange}
                  currInput={query.size}
                />
                <PriceButton addQuery={addQuery} />
                <ConditionButton
                  onInputChange={onInputChange}
                  currInput={query.condition}
                />
                <CategoryButton
                  onInputChange={onInputChange}
                  currInput={query.category}
                />
              </div>
            </div>
            {/**All Products */}
            {loading ? (
              <div className="col-lg-10">
                <LoadingScreen />
              </div>
            ) : (
              <div className="col-lg-10 ">
                {products.length > 0 ? (
                  listOfProducts(shuffle(products))
                ) : (
                  <h1>Not found</h1>
                )}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  query: state.products.query,
  loading: state.products.loading,
});

export default connect(mapStateToProps, {
  getProducts,
  addQuery,
  delCurrentFilter,
})(Gallery);
