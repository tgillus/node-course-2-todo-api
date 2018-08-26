const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");

const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo"
  },
  {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
  }
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    const text = "Test todo text";

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);

            done();
          })
          .catch(err => done(err));
      });
  });

  it("should not create todo with invalid body data", done => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .expect(res => {
        expect(res.body.message).toBe("Todo validation failed");
      })
      .end((err, res) => {
        if (err) {
          done();
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);

            done();
          })
          .catch(err => done(err));
      });
  });
});

describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("should return todo doc", done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it("should return 404 if todo not found", done => {
    const objectId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${objectId}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 if object ID is invalid", done => {
    request(app)
      .get("/todos/123")
      .expect(404)
      .end(done);
  });
});

describe("DELETE /todos/:id", () => {
  it("should remove a todo", done => {
    const objectId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${objectId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(objectId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(objectId)
          .then(todo => {
            expect(todo).toNotExist();
            done();
          })
          .catch(err => done(err));
      });
  });

  it("should return 404 if todo not found", done => {
    const objectId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${objectId}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 if object ID is invalid", done => {
    request(app)
      .delete("/todos/123")
      .expect(404)
      .end(done);
  });
});

describe("PATCH /todos/:id", () => {
  it("should update the todo", done => {
    const objectId = todos[0]._id.toHexString();
    const text = "Run PATH test";

    request(app)
      .patch(`/todos/${objectId}`)
      .send({ text, completed: true })
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(objectId);
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA("number");
      })
      .end(done);
  });

  it("should clear completedAt when todo is not completed", done => {
    const objectId = todos[1]._id.toHexString();
    const text = "Run PATCH test again";

    request(app)
      .patch(`/todos/${objectId}`)
      .send({ text, completed: false })
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(objectId);
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});
