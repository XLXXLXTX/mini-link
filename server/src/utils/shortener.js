import { md5 } from 'js-md5';

/**
 * Encode a string using MD5 hash function
 * @param {*} str original longURL  
 * @returns returns an array of 4 hashes (of 7 hex digits) after md5 is applied
 */
export const encoder = (str) => {
  const hash = md5(str);

  // generate groups of 7 characters long with whatever character found, the '.'
  // use '/g' to apply this reges to the full array instead of only 
  // the first coincidence
  const groups = hash.match(/.{7}/g);

  return groups;
};

/**
 * Build a functional shortURL from a req, and a hasURL
 * @param {*} req request in order to obtain data for the response of the new URL
 * @param {*} hashURL hash of the longURL 
 * @returns a funtional shortURL that is equivalent to the longURL asociated
 */
export const buildShortUrl = (req, hashURL) => {
  return req.protocol + '://' + req.get('host') + '/' + hashURL;
};