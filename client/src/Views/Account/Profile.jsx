import React, { useState } from "react";
import Icon from "../components/common/Icon";
import { connect } from "react-redux";
import { onInputUpdate, onSaveProfile } from "../../actions/userAction";

const Profile = ({ user, onInputUpdate, inputProfile, onSaveProfile }) => {
  const [input, setInput] = useState(0);

  const activeEdit = (val) => {
    if (val === input) {
      setInput(0);
    } else {
      setInput(val);
    }
  };

  const onSave = () => {
    onSaveProfile(inputProfile, user._id);
    setInput(0);
  };
  return (
    <section
      className="tab-content__profile tab-pane fade show "
      id="nav-profile"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      <div className="container p-5">
        <h1>Profile</h1>
        <form className="row tab-content__profile--form">
          <div className="col-md-4 col-12">
            <label>First Name</label>
            <div className="d-flex justify-content-between">
              {input === 1 ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    onChange={onInputUpdate}
                  />
                  <div>
                    <Icon iconName="fa fa-save" onClick={onSave} />
                    <Icon
                      iconName="fa fa-times"
                      onClick={() => activeEdit(1)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <span>{user.firstName}</span>
                  <Icon iconName="fa fa-edit" onClick={() => activeEdit(1)} />
                </>
              )}
            </div>
          </div>

          <div className="col-md-4 col-12">
            <label>Last Name</label>
            <div className="d-flex justify-content-between">
              {input === 2 ? (
                <>
                  <input type="text" name="lastName" onChange={onInputUpdate} />
                  <div>
                    <Icon iconName="fa fa-save" onClick={onSave} />
                    <Icon
                      iconName="fa fa-times"
                      onClick={() => activeEdit(2)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <span>{user.lastName}</span>
                  <Icon iconName="fa fa-edit" onClick={() => activeEdit(2)} />
                </>
              )}
            </div>
          </div>

          <div className="col-md-4 col-12">
            <label>Email</label>
            <div className="d-flex justify-content-between">
              {input === 3 ? (
                <>
                  <input type="text" name="email" onChange={onInputUpdate} />
                  <div>
                    <Icon iconName="fa fa-save" onClick={onSave} />
                    <Icon
                      iconName="fa fa-times"
                      onClick={() => activeEdit(3)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <span>{user.email}</span>
                  <Icon iconName="fa fa-edit" onClick={() => activeEdit(3)} />
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  inputProfile: state.user.inputProfile,
});

export default connect(mapStateToProps, { onInputUpdate, onSaveProfile })(
  Profile
);
