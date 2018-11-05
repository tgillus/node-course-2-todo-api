const bcrypt = require("bcryptjs");

const password = "abc123!";

// bcrypt.genSalt(10, (error, salt) => {
//   bcrypt.hash(password, salt, (error, hash) => {
//     console.log(hash);
//   });
// });

const hashedPassword =
  "$2a$10$.VRkRPlC8ctH42cPnMKIHuIfgd8putYU3sSO.N5a.qfTCiO2ycrqS";

bcrypt.compare(password, hashedPassword, (error, result) => {
  console.log(result);
});

// const jwt = require("jsonwebtoken");

// const data = { id: 10 };
//
// const token = jwt.sign(data, "123abc");
// console.log("token:", token);
//
// const decoded = jwt.verify(token, "123abc");
// console.log("decoded:", decoded);

// const { SHA256 } = require("crypto-js");
//
// const message = "I am user number 3";
// const hash = SHA256(message).toString();
//
// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);
//
// const data = { id: 4 };
// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// const resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();
//
// if (resultHash === token.hash) {
//   console.log("Data was not changed.");
// } else {
//   console.log("Data was changed. Do not trust!");
// }
