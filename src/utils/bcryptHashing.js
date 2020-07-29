const bcrypt = require("bcrypt");

module.exports = {
  async hashPassword(aPassword) {
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
  },

  async checkHashPassword(AnEmail, aPassword, aStoredPassword) {
    function lookupUser(user, passwd, hashedPassword) {
      return new Promise((resolve, reject) => {
        resolve({
          user: user,
          password: passwd,
          hash1: hashedPassword,
        });
      });
    }
    function reHash(user, password, hash1) {
      // extract salt from existing has (30 characters)
      let salt = hash1.substr(0, 30);
      return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, function (err, hash2) {
          if (err) {
            reject({
              err,
              user: user,
              salt: salt,
              password: password,
              hash1: hash1, // stored hash
              hash2: hash2, // generated hash
            });
          } else {
            resolve({
              user: user,
              salt: salt,
              password: password,
              hash1: hash1, // stored hash
              hash2: hash2, // generated hash
            });
          }
        });
      });
    }
    // lookup and verify
    return lookupUser(AnEmail, aPassword, aStoredPassword)
      .then(function (result) {
        return reHash(result.user, result.password, result.hash1);
      })
      .then(function (result) {
        if (result.hash1 === result.hash2) {
          console.log("password verified");
          return true;
        } else {
          console.log(" password verification failed");
          return false;
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
