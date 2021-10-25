const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User");
const bcrypt = require("bcrypt");

// const fileUploader = require('../config/cloudinary.js');

router.get("/signin", (req, res) => {
  res.render("auth/signin.hbs");
});

router.get("/signup", (req, res) => {
  res.render("auth/signup.hbs");
});

router.get("/signout", (req,res) => {
    req.session.destroy(function(err) {
        res.redirect("/auth/signin")
    })
})

router.post("/signin", async (req,res) => {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email: email });

  if (!foundUser) {
      req.flash("error", "Invalid credentials");
      res.redirect("/auth/signin");
  } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
          req.flash("error", "Invalid credentials");
          res.redirect("/auth/signin")
      } else {
          const userObject = foundUser.toObject();
          delete userObject.password;
          req.session.currentUser = userObject;

          req.flash("success", "Successfully logged in...");
          res.redirect("/");
      }
  }
})

router.post("/signup", async (req,res) => {
    try {
        const newUser = {...req.body};
        console.log(req.body)
        // if (!req.file) newUser.avatar =undefined;
        // else newUser.avatar = req.file.path;
        const foundUser = await UserModel.findOne({ email: newUser.email });

        if (foundUser) {
            req.flash("warning", "email already registered");
            res.redirect("/auth/signup");
        } else {
            const hashedPassword = bcrypt.hashSync(newUser.password, 10);
            newUser.password = hashedPassword;
            const user = await UserModel.create(newUser);
            req.flash("success", "Congrats ! You are now registered !")
            res.redirect("/auth/signin")
        }
    } catch (err) {
        let errorMessage = "";
        for (field in err.errors) {
          errorMessage += err.errors[field].message + "\n";
        }
        req.flash("error", errorMessage);
        res.redirect("/auth/signup");
      }
})



module.exports = router;