import React from "react";
import { connect } from "react-redux";
import { showAuthForm } from "../../../actions/authAction";
import AuthForm from "./AuthForm";

const Signup = ({ show, onSignup, confirmPassword, showAuthForm }) => {
  return (
    <>
      <div
        className={`${show === "signup" ? "authForm__banner--2" : "d-none"}`}
      >
        <h1>Join Us !</h1>
        <p>
          Create an account and you can start selling or buying. In order to
          place selling or buying on the site a person must first sign up for an
          account
        </p>
      </div>
      <div
        className={`cardForm card_right ${
          show === "signup" ? "" : "hide-signup"
        }`}
      >
        <AuthForm
          title="signup"
          toggleSubmit={onSignup}
          buttonText="Sign Up"
          navigateTo={() => showAuthForm("login")}
          confirmPassword={confirmPassword}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { show, confirmPassword } = auth;
  return { show, confirmPassword };
};

export default connect(mapStateToProps, { showAuthForm })(Signup);
