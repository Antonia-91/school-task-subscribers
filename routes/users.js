var express = require("express");
var router = express.Router();

const User = require("../model/user");

// /* GET users listing. */
// router.get("/", function (req, res, next) {

//   res.send("HELLO FRoM USER");
// });

//GET: returns all users
router.get("/", (req, res) => {
  //ASYNC
  User.find()
    .then((users) => {
      if (users.length === 0) {
        res.status(404).json({ failed: "Empty Directory" });
      } else {
        res.json(users);
      }
    })
    .catch((err) => res.json({ failed: err }));
});

//POST: creates user, saves to database, returns created user
router.post("/", (req, res) => {
  if (JSON.stringify(req.body) === "{}") {
    res
      .status(400)
      .send({ message: "Post request for creating user cannot be empty" });
    return;
  }
  let userCreated = new User({
    fName: req.body.fName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    subscribed: req.body.subscribed,
  });

  userCreated
    .save()
    .then((userCreated) => res.status(201).json(userCreated))
    .catch((err) => res.status(500).json({ failed: "User not created" + err }));
});

module.exports = router;

//GET: retuns user by id
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ failed: "Empty Directory" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => console.log(err));
});

//PUT receives subscriber info from frontend, makes changes in database

//POST logs in user, user sends json (username, password)
