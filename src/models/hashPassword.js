const bcrypt = require("bcrypt");

module.exports = async (aPassword) => {
  let password = aPassword;
  let hashedPassword = "";

  // first generate a random salt
  function genSalt(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          reject(err);
        } else {
          resolve({
            salt: salt,
            password: password,
          });
        }
      });
    });
  }

  // hash the password with the salt
  function genHash(salt, password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          reject(err);
        } else {
          resolve({
            salt: salt,
            password: password,
            hash: hash,
          });
        }
      });
    });
  }

  // execute in sequence
  await genSalt(password)
    .then(function (result) {
      return genHash(result.salt, result.password);
    })
    .then(function (result) {
      hashedPassword = result.hash;
    })
    .catch(function (err) {
      console.log(err);
    });
  return hashedPassword;
};
