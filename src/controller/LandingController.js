module.exports = {
  welcome(req, res) {
    res.status(200).json({ message: "Welcome Traveller" });
  },
};
