const assert = require("assert");
const User = require("../src/users");

describe("Updating records", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => {
      done();
    });
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  }

  it("Instance set and save", (done) => {
    joe.set({ name: "Alex" });
    joe.save().then(() => {
      User.findOne({ name: "Alex" }).then((user) => {
        assert(user.name === "Alex");
        done();
      });
    });
  });

  it("a model instance can update", async () => {
    await assertName(joe.update({ name: "Alex" }));
    await joe.save();
  });

  it("A model class can update", (done) => {
    assertName(User.updateMany({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("A model class can update one record", (done) => {
    assertName(User.updateOne({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("A model class can find a record with an Id and update", (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });
});
