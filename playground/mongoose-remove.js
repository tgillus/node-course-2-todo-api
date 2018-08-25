const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// Todo.remove({}).then(result => {
//   console.log(result);
// });

Todo.findOneAndRemove({ _id: "5b80c5bbe3b2e363c578c2b6" }).then(todo => {});

// Todo.findByIdAndRemove("5b80c5bbe3b2e363c578c2b6").then(todo => {
//   console.log(todo);
// });
