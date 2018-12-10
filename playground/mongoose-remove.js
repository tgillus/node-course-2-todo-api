require("./../server/db/mongoose");

const { Todo } = require("./../server/models/todo");

// Todo.deleteMany({}).then(result => {
//   console.log(result);
// });

Todo.findOneAndRemove({ _id: "5b80c5bbe3b2e363c578c2b6" }).then(() => {});

// Todo.findByIdAndRemove("5b80c5bbe3b2e363c578c2b6").then(todo => {
//   console.log(todo);
// });
