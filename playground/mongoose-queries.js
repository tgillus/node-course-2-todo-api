const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// const id = "5b7c2f77c3d822be1ada59f211";
//
// if (!ObjectID.isValid(id)) {
//   console.log("ID not valid.");
// }

// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log("Todos:", todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log("Todo:", todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log("ID not found.");
//     }
//
//     console.log("Todo by ID:", todo);
//   })
//   .catch(err => console.log(err));

const userId = "5b63c654e7e9f0940aa96f6a";

User.findById(userId).then(
  user => {
    if (!user) {
      return console.log("User not found.");
    }

    console.log(JSON.stringify(user, undefined, 2));
  },
  err => console.log("Something went wrong")
);
