import React from "react";
import { ReactComponent as Logo } from "../../../svgs/hanger-line.svg";
import { connect } from "react-redux";
import {
  emailChanged,
  passwordChanged,
  confirmPasswordChange,
} from "../../../actions/authAction";
import InputSection from "../common/InputSection";
import Spinner from "../spinner/Spinner";

const AuthForm = ({
  title,
  loading,
  error,
  email,
  password,
  confirmPasswordChange,
  buttonText,
  emailChanged,
  passwordChanged,
  confirmPassword,
  navigateTo,
  toggleSubmit,
}) => {
  const renderError = () => {
    if (error) {
      return <span style={{ color: "red" }}>{error}</span>;
    }
  };

  return (
    <form className="authForm__form" onSubmit={toggleSubmit}>
      <div className="authForm__form--logo">
        <Logo size={"40%"} />
      </div>
      <h1 className="authForm__form--title">{title}</h1>

      <InputSection
        labelText="Email"
        type="text"
        name="email"
        value={email}
        placeholder="Email@gmail.com"
        onChange={emailChanged}
      />
      <InputSection
        labelText="Password"
        type="password"
        name="password"
        value={password}
        placeholder="*******"
        onChange={passwordChanged}
      />

      {title === "signup" && (
        <InputSection
          labelText="Confirm Password"
          type="password"
          name="password"
          value={confirmPassword}
          placeholder="*******"
          onChange={confirmPasswordChange}
        />
      )}
      {renderError()}
      <div className="mt-5">
        {loading ? (
          <Spinner />
        ) : (
          <input className="mr-3" type="submit" value={buttonText} />
        )}
        {title === "login" && <a href="/#">Forgot Password?</a>}
      </div>

      <div className="mt-5">
        {title === "login" ? (
          <>
            Don't have an account?
            <a href="#signup" onClick={navigateTo}>
              Sign Up
            </a>
          </>
        ) : (
          <>
            Have an account?
            <a href="#login" onClick={navigateTo}>
              Log In
            </a>
          </>
        )}
      </div>
    </form>
  );
};

const mapStateToProps = ({ auth }) => {
  const { email, password, loading, error } = auth;
  return {
    email,
    password,
    loading,
    error,
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  confirmPasswordChange,
})(AuthForm);
