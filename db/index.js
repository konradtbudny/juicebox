const { Client } = require("pg"); // imports the pg module
const { rows } = require("pg/lib/defaults");

const client = new Client("postgres://localhost:5432/juicebox-dev");

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username, name, location, active
        FROM users;
        `
  );
  return rows;
}
async function createUser({ username, password, name, location }) {
  try {
    const result = await client.query(
      `
      INSERT INTO users(username, password, name, location)
      VALUES ($1,$2,$3,$4)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
      `,
      [username, password, name, location]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  getAllUsers,
  createUser,
};
