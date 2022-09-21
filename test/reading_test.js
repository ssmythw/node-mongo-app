const { doesNotMatch } = require("assert");
const assert = require("assert");
const User = require("../src/users");

describe("Reading users out of the database", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => {
      done();
    });
  });

  it("finds all users with a name of joe", () => {
    User.find({ name: "Joe" }).then((users) => {
      assert(users[0]._id.toString() === joe._id);
      done();
    });
  });

  it("finds a user with a particular id", (done) => {
    User.findById(joe._id).then((user) => {
      assert(user !== null);
      done();
    });
  });
});
