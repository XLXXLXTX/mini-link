import { runQuery } from './dbController.js';

export async function getKeys() {
  const rs = await runQuery('SELECT id, apiKey, expiresAt, creationDate FROM keys;');
  return rs.rows;
}

export async function insertKey(apiKey, expiresAt) {
  await runQuery('INSERT INTO keys (apiKey, expiresAt) VALUES (?, ?);', [apiKey, expiresAt], false);
}

export async function deleteKeyById(id) {
  await runQuery('DELETE FROM keys WHERE id = ?;', [id], false);
}
