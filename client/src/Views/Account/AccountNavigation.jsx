import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { saveAvatarImg } from "../../actions/userAction";
import ShopListing from "./ShopListing";
import Spinner from "../components/spinner/Spinner";
import Profile from "./Profile";

const AccountNavigation = ({ user, saveAvatarImg, loading }) => {
  const [buttonSave, setButtonSave] = useState(false);

  const onAvatarInput = ({ target: { files } }) => {
    document.querySelector(
      "#avatarImg"
    ).style.backgroundImage = `url(${window.URL.createObjectURL(files[0])})`;
    setButtonSave(true);
  };

  const onCancel = () => {
    document.querySelector(
      "#avatarImg"
    ).style.backgroundImage = `url(http://localhost:3500/${user.avatarUrl})`;
    setButtonSave(false);
  };

  const onSave = () => {
    const form_data = new FormData();
    const img = document.querySelector("#inputAvatar").files[0];
    form_data.append("avatar", img);

    saveAvatarImg(user._id, form_data);
  };

  useEffect(() => {
    setButtonSave(false);
  }, [user]);

  useEffect(() => {
    // page view init to top page
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shop">
      <div className="shop__imgCover">
        {user && (
          <label
            id="avatarImg"
            className="shop__imgCover--avatar"
            title="Shop Photo"
            style={{
              backgroundImage: `url(${
                user.avatarUrl
                  ? `http://localhost:3500/${user.avatarUrl}`
                  : "../../../images/avatar.png"
              })`,
            }}
          >
            <input id="inputAvatar" type="file" onChange={onAvatarInput} />
          </label>
        )}
        {buttonSave && (
          <div className="shop__imgCover--buttons">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <button onClick={onSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="shop__wrapper">
        <nav className="shop__wrapper--nav">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              className="nav-item nav-link active"
              id="nav-contact-tab"
              data-toggle="tab"
              href="#nav-contact"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
            >
              Listings
            </a>
            <a
              className="nav-item nav-link "
              id="nav-profile-tab"
              data-toggle="tab"
              href="#nav-orders"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="true"
            >
              Orders
            </a>
            <a
              className="nav-item nav-link "
              id="nav-profile-tab"
              data-toggle="tab"
              href="#nav-profile"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="true"
            >
              Account
            </a>
          </div>
        </nav>
        {user && (
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show "
              id="nav-orders"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              Orders
            </div>
            <ShopListing />
            <Profile />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
});

export default connect(mapStateToProps, { saveAvatarImg })(AccountNavigation);
