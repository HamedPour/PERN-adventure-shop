module.exports = {
  // signUP
  signup(req, res) {
    const { email, password } = req.body;
    console.log(email);
    res.send({ message: "register here" });
  },
  // login
  // logout
};
