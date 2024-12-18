import { runQuery } from './dbController.js';

export const getUser = async (user) => {
  const rs = await runQuery(
    'SELECT id, username, password FROM users WHERE username = ?;',
    [user]
  );

  if (rs.rows.length === 0) {
    return null;
  } else {
    let { id, username, password } = rs.rows[0];
    return { id, username, password };
  }
};

export const getUserById = async (id) => {
  const rs = await runQuery(
    'SELECT id, username, password FROM users WHERE id = ?;',
    [id]
  );

  if (rs.rows.length === 0) {
    return null;
  } else {
    let { id, username, password } = rs.rows[0];
    return { id, username, password };
  }
};
