/* eslint-disable */
const {
  MongoDbBase,
  checkId,
  adaptId,
} = require("../../repository/mongodb/base");

const { ClientError } = require("../../error");

const COLLECTION = "test-persons";

// TODO add handling errors
describe("MongoDB Base Repo", () => {
  const repository = new MongoDbBase();
  const persons = [
    { name: "John Smith", age: 29 },
    { name: "Jane Smith", age: 28 },
  ];
  const personIds = new Array(2);

  beforeAll(async () => {
    await repository.connect();
  });

  test("check correct id", () => {
    expect(checkId("63f2d01c3249aed5b5ff9149")).toEqual(true);
  });

  test("check wrong id", () => {
    try {
      checkId("wrong-id");
    } catch (err) {
      expect(err instanceof ClientError).toEqual(true);
    }
  });

  test("replace id with _id", () => {
    expect.assertions(2);
    const params = {
      id: "63f2d01c3249aed5b5ff9149",
    };
    const newParams = adaptId(params);
    expect(newParams.id).toEqual(undefined);
    expect(newParams._id.toString()).toEqual(params.id);
  });

  test("createOne", async () => {
    expect.assertions(2);
    personIds[0] = await repository._createOne(COLLECTION, persons[0]);
    personIds[1] = await repository._createOne(COLLECTION, persons[1]);
    expect(personIds[0]).toBeTruthy();
    expect(personIds[1]).toBeTruthy();
  });

  test("findOne", async () => {
    expect.assertions(1);
    const foundedPerson = await repository._findOne(COLLECTION, {
      age: persons[1].age,
    });
    expect(foundedPerson.name).toEqual(persons[1].name);
  });

  test("findMany", async () => {
    expect.assertions(1);
    const foundedPersons = await repository._findMany(COLLECTION, {});
    expect(foundedPersons.length).toEqual(persons.length);
  });

  test("updateOne", async () => {
    expect.assertions(1);
    const newAge = 30;
    await repository._updateOne(COLLECTION, {
      id: personIds[0],
      age: newAge,
    });
    const updatedPerson = await repository._findOne(COLLECTION, {
      id: personIds[0],
    });
    expect(updatedPerson.age).toEqual(newAge);
  });

  test("deleteOne", async () => {
    expect.assertions(1);
    await repository._deleteOne(COLLECTION, { id: personIds[0] });
    await repository._deleteOne(COLLECTION, { id: personIds[1] });
    const foundedPersons = await repository._findMany(COLLECTION, {});
    expect(foundedPersons.length).toEqual(0);
  });

  afterAll(async () => {
    await repository.disconnect();
  });
});
