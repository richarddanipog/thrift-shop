import React, { Component } from "react";
import Logo from "../common/Logo";
import { getUser, logoutUser } from "../../../actions/authAction";
import { addQuery } from "../../../actions/productsAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

class Header extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  toggleLogOut = () => {
    Cookie.remove("token");
    this.props.logoutUser();
  };

  render() {
    const { user, backgroundColor, addQuery } = this.props;
    const color = backgroundColor || "transparent";
    const position =
      window.location.href === "http://localhost:3000/homepage"
        ? "fixed"
        : "relative";

    window.onscroll = () => {
      if (window.location.href === "http://localhost:3000/homepage") {
        scrollFunction();
      }
    };

    const scrollFunction = () => {
      if (
        (document.body.scrollTop > 800 ||
          document.documentElement.scrollTop > 800) &&
        document.querySelector(".header")
      ) {
        document.querySelector(".header").style.background = "black";
        document.querySelector("#header-nav").style.borderBottom = "none";
      } else if (document.querySelector(".header")) {
        document.querySelector(".header").style.background = "transparent";
        document.querySelector("#header-nav").style.borderBottom =
          "2px solid #fff";
      }
    };

    if (!user && !Cookie.get("token")) {
      window.location.href = "http://localhost:3000/";
    }

    return (
      <div
        className="header"
        style={{
          backgroundColor: `${color}`,
          position,
        }}
      >
        <nav
          id="header-nav"
          className="container navbar navbar-expand-lg navbar-dark "
          style={{
            borderBottom: `${backgroundColor ? backgroundColor : ""}`,
          }}
        >
          <Logo size={"6rem"} />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <div className="d-flex justify-content-between w-100 p-5">
              <ul className="navbar-nav">
                <li className="navbar-nav__link">
                  <Link to="/homepage">Home</Link>
                </li>
                <li className="navbar-nav__link">
                  <Link
                    to="/gallery"
                    onClick={() => addQuery({ gender: "men" })}
                  >
                    Men
                  </Link>
                </li>
                <li className="navbar-nav__link">
                  <Link
                    to="/gallery"
                    onClick={() => addQuery({ gender: "women" })}
                  >
                    Women
                  </Link>
                </li>
              </ul>

              <ul className="navbar-nav">
                <li className="navbar-nav__link">
                  <i className="fa fa-user" />
                </li>
                <li className="navbar-nav__link">
                  <Link to="/my-shop/selling">Account</Link>
                </li>
                <li className="navbar-nav__link" onClick={this.toggleLogOut}>
                  Log Out
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, { getUser, logoutUser, addQuery })(
  Header
);
