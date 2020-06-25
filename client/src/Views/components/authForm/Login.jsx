import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  loginUser,
  showAuthForm,
  signupUser,
} from "../../../actions/authAction";
import AuthForm from "./AuthForm";
import Signup from "./Signup";

const Login = ({
  loginUser,
  signupUser,
  token,
  showAuthForm,
  show,
  email,
  password,
  confirmPassword,
}) => {
  const onLogin = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  const onSignup = (e) => {
    e.preventDefault();
    signupUser({ email, password, confirmPassword });
  };

  if (token) {
    return <Redirect to="/homepage" />;
  }
  return (
    <div className="authForm container-fluid p-0">
      <img src="../../images/hype2.jpg" alt="backgroud" />

      <img
        className={`${show === "login" ? "" : "top"}`}
        src="../../images/hype1.jpg"
        alt="backgroud"
      />
      <div className={`${show === "login" ? "authForm__banner--1" : "d-none"}`}>
        <h1>
          Premium Streetwear
          <br />
          Urban Clothing Boutique
        </h1>
        <p>
          {" "}
          Enjoy a top to bottom shopping experience with a huge selection of
          graphic tees, hoodies outerwear, headwear, accessories, & More.{" "}
        </p>
      </div>

      <div
        className={`cardForm  ${show === "login" ? "card_left" : "hide-login"}`}
      >
        <AuthForm
          title="login"
          toggleSubmit={onLogin}
          buttonText="Login"
          navigateTo={() => showAuthForm("signup")}
        />
      </div>

      <Signup onSignup={onSignup} />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { token, show, email, password, confirmPassword } = auth;
  return { token, show, email, password, confirmPassword };
};

export default connect(mapStateToProps, {
  loginUser,
  showAuthForm,
  signupUser,
})(Login);
