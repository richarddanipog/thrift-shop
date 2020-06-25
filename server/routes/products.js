const express = require("express");
const router = express.Router();
const Product = require("../api/models/Products");
const multer = require("multer");
const { builder } = require("../api/products");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/products");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

const imagesUrls = (img) => {
  return "images/products/" + img.originalname;
};

/** POST ADD PRODUCT */
router.post("/", upload.array("productImage"), async (req, res) => {
  const imagesPaths = req.files.map((img) => imagesUrls(img));

  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      color: req.body.color,
      brand: req.body.brand,
      details: req.body.details,
      gender: req.body.gender,
      condition: req.body.condition,
      category: req.body.category,
      user_id: req.body.user_id,
      images: imagesPaths,
    });

    await product.save();
    res.send({ product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** GET ALL PRODUCTS */
router.get("/", (req, res) => {
  const build = builder(req.query); // builder for filter search
  Product.find(build, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.send(results);
    }
  });
});

/** GET USER LIST OF IS PRODUCT */
router.get("/:id", (req, res) => {
  Product.find({ user_id: req.params.id }, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.send(results);
    }
  });
});

/** GET SINGLE PRODUCT BY ID */
router.get("/product/:id", (req, res) => {
  Product.find({ _id: req.params.id }, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.send(results);
    }
  });
});

/** UPDATE PRODUCT BY ID */
router.put("/product/:id", upload.array("productImage"), (req, res) => {
  Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (!product) {
        res.status(404).send("invalid error");
      } else {
        for (const prop in req.body) {
          if (prop !== "images") {
            product[prop] = req.body[prop];
          }
        }
        product.save();
        res.send({ product });
      }
    }
  });
});

module.exports = router;
