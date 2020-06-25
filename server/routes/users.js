require("../api/models/Users");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const requireAuth = require("../api/middleware/requireAuth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/products");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

const User = require("../api/models/Users");

/** GET USER PRODUCT BY PRODUCT_ID */
router.get("/product/:id", async (req, res) => {
  try {
    User.findById({ _id: req.params.id }, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (!user) {
          res.status(404).send("User Not Found");
        }
        user.save();
        res.send({ user });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** POST SING UP TO WEBSITE */
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });

    await user.save();
    //Send token to client side
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 });
    res.status(201).send({ token });
  } catch (error) {
    return res.status(422).send({ error: "Invalid email" });
  }
});

/** POST SING IN TO ACCOUNT */
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 });
    res.send({ token });
  } catch (error) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

/**GET USER DETAILS */
router.get("/", requireAuth, async (req, res) => {
  const user = req.user;
  res.send({ user });
});

/**USER CHANGE IMAGE PROFILE */
router.put("/image/:id", upload.single("avatar"), async (req, res) => {
  User.findById({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (!user) {
        res.status(404).send("invalid error");
      } else {
        user["avatarUrl"] = `images/products/${req.file.originalname}`;
      }

      user.save();
      res.send({ user });
    }
  });
});

/**USER CHANGE PROFILE DETAILS */
router.put("/:id", async (req, res) => {
  const prop = Object.keys(req.body)[0];

  User.findById({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (!user) {
        res.status(404).send("invalid error");
      } else {
        user[prop] = req.body[prop];
      }

      user.save();
      res.send({ user });
    }
  });
});
module.exports = router;
