const { client, getAllUsers, createUser} = require("./index");

async function createInitialUsers() {
    try {
      console.log("Starting to create users...");
  
      const albert = await createUser({ username: 'albert', password: 'bertie99' });
      const sandra = await createUser({ username: 'sandra', password: '2sandy4me' });
      const glamgal = await createUser({ username: 'glamgal', password: 'soglam' });
      console.log(albert);
  
      console.log("Finished creating users!");
    } catch(error) {
      console.error("Error creating users!");
      throw error;
    }
  }//createInitialUsers

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`DROP TABLE IF EXISTS users;`);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
} //dropTables

async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL);
      `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
} //createTables

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    throw error;
}
} //rebuildDB

async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
} //testDB

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
