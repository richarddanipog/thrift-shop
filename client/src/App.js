import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookie from "js-cookie";
import "./css/main.css";
import Login from "./Views/components/authForm/Login";
import HomePage from "./Views/HomePage/HomePage";
import Account from "./Views/Account/Account";
import AddProduct from "./Views/Account/AddProduct";
import AccountNavigation from "./Views/Account/AccountNavigation";
import EditProduct from "./Views/Account/EditProduct";
import SingleProduct from "./Views/Product/SingleProduct";
import Header from "./Views/components/Header/Header";
import Gallery from "./Views/Gallery/Gallery";
import Footer from "./Views/components/Footer/Footer";

class App extends Component {
  render() {
    const checkedCookie = () => {
      if (Cookie.get("token")) {
        return <Redirect to="/homepage" />;
      } else {
        return <Redirect to="/" />;
      }
    };
    return (
      <Provider store={store}>
        <Router>
          {checkedCookie()}
          <div className="root">
            <Switch>
              <Route path="/my-shop">
                {/** Component Account USER*/}
                <Account>
                  <Header backgroundColor="black" />
                  <Route
                    component={({ match }) => (
                      <>
                        <Route
                          path="/my-shop/selling"
                          component={AccountNavigation}
                        />
                        <Route
                          path="/my-shop/add_product"
                          component={AddProduct}
                        />
                        <Route
                          path="/my-shop/editProduct/:id"
                          component={EditProduct}
                        />
                      </>
                    )}
                  />
                  <Footer />
                </Account>
              </Route>

              <Route path="/gallery" component={Gallery} />
              <Route path="/product/:id" component={SingleProduct} />
              <Route path="/homepage" component={HomePage} />
              <Route path="/" component={Login} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
