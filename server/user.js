const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const getOwnershipToken = async (emailAddress) => {
  const query = await db.query(`select ownership_token from users where email_address = $1`, [emailAddress]);
  if (query.rows.length > 0) {
    return query.rows[0].ownership_token;
  }
  return null;
};

const addUser = async (emailAddress) => {
  const ownershipToken = uuidv4();
  const query = await db.query(`insert into users (email_address, ownership_token) values ($1, $2)`,
    [emailAddress, ownershipToken]);
  if (query.rows.length > 0) {
    return query.rows[0].email_address;
  }
  return { emailAddress, ownershipToken };
};

module.exports = { addUser, getOwnershipToken };