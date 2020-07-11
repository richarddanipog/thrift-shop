import React, { useEffect } from "react";
import { connect } from "react-redux";
import Carousel from "../components/Carousel/Carousel";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import CarouselProducts from "../components/Carousel/CarouselProducts";
import { getProducts, addQuery } from "../../actions/productsAction";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const HomePage = ({ products, getProducts, addQuery }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <div className="homepage">
      <Header />
      <Carousel />
      <section className="homepage__content">
        <img
          className="homepage__content--img1"
          src="../../../images/sneaker-1.png"
          alt=""
        />
        <img
          className="homepage__content--img2"
          src="../../../images/supreme.png"
          alt=""
        />
        <p>
          Rather than a fleeting trend, shopping for used or vintage clothing
          will become a new norm in 2020. If one of your new year’s resolutions
          is to shop more sustainably, the online and IRL vintage boutiques
          listed below will be your best bet for finding timeless classics and
          one-of-a-kind pieces.
        </p>
      </section>
      <section className="mb-5 mt-5">
        <CarouselProducts
          title="Deal Picks"
          products={products}
          carouselId="carouselProducts2"
        />
      </section>
      <section className="homepage__banners container mt-5 mb-5">
        <h1 className="pb-3">Shop Now</h1>
        <div className="homepage__banners--categories row">
          <Banner
            url={"../../images/cmen.jpg"}
            gender="Men"
            colNum="4"
            onClickBanner={() => addQuery({ gender: "men" })}
          />
          <Banner
            url={"../../images/cwomen.jpg"}
            gender="Women"
            colNum="4"
            onClickBanner={() => addQuery({ gender: "women" })}
          />
          <Banner url={"../../images/call.jpg"} gender="View All" colNum="4" />
        </div>
      </section>

      <div className="homepage__about container text-center">
        <h2>About Us</h2>
        <strong>We aren't typical thrift store.</strong>
        <br />
        We’re the world’s largest online secondhand shopping destination with
        thousands of like-new styles from your favorite brands at up to 90% off
        estimated retail. We make sure every single one of the 15K new arrivals
        we add to the site every day is 100% authentic and in such good shape
        anyone could mistake them as new. No knockoffs here—just knockoff
        prices. Find high-quality used women’s clothing and used children’s
        clothing from fashionable closets just like yours. Specially curated by
        our style experts.
      </div>

      <div
        className="homepage__toShop"
        style={{ backgroundImage: "url(../../../images/models.jpg)" }}
      >
        <h1>The One-stop destination for buying, selling and exploring.</h1>
        <Link to="/gallery" onClick={() => window.scrollTo(0, 0)}>
          <label>Shop</label>
        </Link>
      </div>
      <section className="mb-5 mt-5">
        <CarouselProducts
          title="Trending Streetwear"
          products={products}
          carouselId="carouselProducts"
        />
      </section>

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default connect(mapStateToProps, { getProducts, addQuery })(HomePage);
