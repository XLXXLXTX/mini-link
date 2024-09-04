// Controller for the logic related to the URLs

import { runQuery } from './dbController.js';
import { encoder, buildShortUrl } from '../utils/shortener.js';

/**
 * Return a longURL from the database in case its already register
 * @param {*} shortURL hash associated of a longURL 
 * @returns JSON object with longURL in case the shortURL is asociated to a longURL, in other case, the longURL is null
 */
export async function getLongURL(hashURL) {
  const rs = await runQuery('SELECT longURL FROM links WHERE hashURL = ?;', [hashURL]);

  return rs.length > 0 ? rs[0] : null;
}

/**
 * Check if a longURL is already register, and if so, return the hash asociated 
 * @param {*} url longURL to be checked if exists already as a shorten url
 * @returns a JSON object with 'exist' as a boolean value, and in case it exist, 
 * the field 'hashURL' with the hash to build the shortURL: {exist: true, hashURL:'a1b2c3d'}, {exist: false}
 */
export async function checkIfURLExists(url) {
  const rs = await runQuery('SELECT longURL, hashURL FROM links WHERE longURL = ?;', [url]);

  let { longURL, hashURL } = rs;
  let exist = longURL === undefined ? false : true;

  if (exist) {
    return { exist, hashURL };
  } else {
    return { exist };
  }
}

/**
 * Given a req and a longURL, a shortURL is register and linked to the longURL
 * @param {*} req request in order to obtain data for the response of the new URL
 * @param {*} longURL the original url that will be shorten
 * @returns a functional shortURL asociated to the longURL
 */
export async function createShortURL(req, longURL) {
  const qInsert = 'INSERT INTO links (hashURL, longURL) VALUES (?, ?);';
  const qSelect = 'SELECT count(*) AS total FROM links WHERE hashURL = ?;';

  const hashes = encoder(longURL);
  let hashURL;

  if (Array.isArray(hashes)) {
    for (const element of hashes) {
      const rSelect = await runQuery(qSelect, [element]);
      let { total } = rSelect;

      if (total != 0) { continue; }

      hashURL = element;
      await runQuery(qInsert, [element, longURL], false);
      break;
    }
  } else {
    console.error('Hashes is not an array');
    throw new Error('Hash generation failed');
  }

  return buildShortUrl(req, hashURL);
}
