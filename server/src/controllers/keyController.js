import { runQuery } from './dbController.js';

export async function getKeys() {
  const rs = await runQuery('SELECT id, apiKey, expiresAt, creationDate FROM keys;');
  return rs.rows;
}
