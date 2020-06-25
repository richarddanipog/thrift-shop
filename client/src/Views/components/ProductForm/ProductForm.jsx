import React, { Component } from "react";
import { connect } from "react-redux";
import {
  inputChanged,
  inputFiles,
  addProduct,
  getProductById,
} from "../../../actions/productsAction";
import validate from "../../../validation/validator";
import InputErrors from "../../../validation/inputErrors";
import { Link, Redirect } from "react-router-dom";
import Spinner from "../spinner/Spinner";

class ProductForm extends Component {
  async componentDidMount() {
    const { id } = this.props;
    if (id) {
      await this.props.getProductById({ byId: id }, true);
      this.showInputImages();
    }
  }

  onInputChange = async ({ target: { name, value, files } }) => {
    const errors = validate(
      name,
      value,
      this.props.actionsProduct[name].validations
    );

    if (name === "images") {
      await this.props.inputFiles({ files, errors });
      this.showInputImages();
    } else {
      this.props.inputChanged({ name, value: value.toLowerCase(), errors });
    }
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const { actionsProduct, user, savedProduct } = this.props;
    let isOK = true;
    for (let prop in actionsProduct) {
      const field = actionsProduct[prop];

      if (field instanceof Object || Array.isArray(field)) {
        const errors = validate(prop, field.value, field.validations);

        if (errors.length) {
          isOK = false;
          this.props.inputChanged({ ...field, errors });
        }
      }
    }
    if (isOK) {
      const result = {};
      const form_data = new FormData();
      for (let prop in actionsProduct) {
        result[prop] = actionsProduct[prop].value;
        form_data.append(prop, actionsProduct[prop].value);
      }
      for (let i = 0; i < document.querySelector("#img").files.length; i++) {
        console.log(document.querySelector("#img").files[i]);
        form_data.append(
          "productImage",
          document.querySelector("#img").files[i]
        );
      }
      result.user_id = user._id;
      form_data.append("user_id", user._id);
      savedProduct({ byId: this.props.id, data: form_data });
    }
  };

  showInputImages = () => {
    const { images } = this.props.actionsProduct;
    const d = document.querySelector(".productForm__inner--images");

    d.innerHTML = "";
    for (let i = 0; i < images.value.length; i++) {
      const att = document.createAttribute("id");
      att.value = `show-img-${i}`;
      let createdImg = document.createElement("img");
      createdImg.setAttributeNode(att);
      d.appendChild(createdImg);
      document.getElementById(`show-img-${i}`).src =
        images.value[i] instanceof Object
          ? window.URL.createObjectURL(images.value[i])
          : `http://localhost:3500/${images.value[i]}`;
    }
  };

  render() {
    const { title, actionsProduct, loading, redirect } = this.props;
    if (redirect) return <Redirect to="/my-shop/selling" />;
    return (
      <div className={"productForm p-5"}>
        <h1>{title}</h1>
        <div className="productForm__wrapper">
          <form className="productForm__inner" onSubmit={this.onSubmitForm}>
            <div className="productForm__inner--section">
              <label>*Name: </label>
              <input
                type="text"
                name="name"
                value={actionsProduct.name.value}
                onChange={this.onInputChange}
              />
              <InputErrors errors={actionsProduct.name.errors} />
            </div>
            <div className="productForm__inner--section">
              <label>*Brand: </label>
              <input
                type="text"
                name="brand"
                value={actionsProduct.brand.value}
                onChange={this.onInputChange}
              />
              <InputErrors errors={actionsProduct.brand.errors} />
            </div>
            <div className="productForm__inner--section">
              <label>*Color: </label>
              <input
                type="text"
                name="color"
                value={actionsProduct.color.value}
                onChange={this.onInputChange}
              />
              <InputErrors errors={actionsProduct.color.errors} />
            </div>
            <div className="productForm__inner--section">
              <label>*Price: </label>
              <input
                type="number"
                name="price"
                value={actionsProduct.price.value}
                onChange={this.onInputChange}
              />
              <InputErrors errors={actionsProduct.price.errors} />
            </div>
            <div className="productForm__inner--section">
              <label>*Description:</label> <br />
              <textarea
                name="details"
                value={actionsProduct.details.value}
                onChange={this.onInputChange}
              ></textarea>
              <InputErrors errors={actionsProduct.details.errors} />
            </div>
            <div className="productForm__inner--section">
              <label>*Size: </label>
              <input
                type="text"
                name="size"
                value={actionsProduct.size.value}
                onChange={this.onInputChange}
              />
              <InputErrors errors={actionsProduct.size.errors} />
            </div>
            <div className="productForm__inner--section">
              <label>*Gender: </label>
              <select
                name="gender"
                value={actionsProduct.gender.value}
                onChange={this.onInputChange}
              >
                <option></option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </select>
              <InputErrors errors={actionsProduct.gender.errors} />
            </div>
            <div className="productForm__inner--section">
              <label>*Category: </label>
              <select
                name="category"
                value={actionsProduct.category.value}
                onChange={this.onInputChange}
              >
                <option></option>
                <option value="bags">Bags</option>
                <option value="shoes">Shoes</option>
                <option value="tops ">Tops </option>
                <option value="bottoms ">Bottoms </option>
                <option value="accessories ">Accessories </option>
              </select>
              <InputErrors errors={actionsProduct.category.errors} />
            </div>
            <div className="productForm__inner--section">
              <label>*Condition: </label>
              <select
                name="condition"
                value={actionsProduct.condition.value}
                onChange={this.onInputChange}
              >
                <option></option>
                <option value="new/never worn">New/Never Worn</option>
                <option value="used">Used</option>
                <option value="very worn">Very Worn</option>
                <option value="gently used">Gently Used</option>
                <option value="not specified">Not Specified</option>
              </select>
              <InputErrors errors={actionsProduct.condition.errors} />
            </div>
            <div className="productForm__inner--section">
              <label>*Photos: </label>
              <input
                id="img"
                type="file"
                name="images"
                accept={"image/*"}
                files={actionsProduct.images.value}
                multiple
                onChange={this.onInputChange}
              />
              <InputErrors errors={actionsProduct.images.errors} />
              <div className={"productForm__inner--images"}>
                <img className={"images"} id={"show-img-0"} alt={""} />
                <img className={"images"} id={"show-img-1"} alt={""} />
                <img className={"images"} id={"show-img-2"} alt={""} />
                <img className={"images"} id={"show-img-3"} alt={""} />
                <img className={"images"} id={"show-img-4"} alt={""} />
              </div>
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <input type="submit" value="Add Product" />
                <Link
                  className="ml-4 productForm__inner--cancelBtn"
                  to="/my-shop/selling"
                >
                  <label>Cancel</label>
                </Link>
              </>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  actionsProduct: state.products.actionsProduct,
  user: state.user.user,
  loading: state.products.loading,
  redirect: state.products.redirect,
});

export default connect(mapStateToProps, {
  inputChanged,
  inputFiles,
  addProduct,
  getProductById,
})(ProductForm);
