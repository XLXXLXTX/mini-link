// Controller for the database

import { tursoDB } from '../db.js'

/**
 * Execute a Query given the SQL query, params, and set the option for the type of query
 * @param {*} query  SQL query, required
 * @param {*} params parameters used in the query, optional
 * @param {*} isSelectQuery by defautl is true, in case is not a SELECT ... FROM ... set to false
 * @returns returns the an array with the result of the query. 
 * In case of a SELECT ... FROM ... returns the rows array, in case of INSERT INTO ... returns the lastInsertRowid
 */
export const runQuery = async (query, params = [], isSelectQuery = true) => {
  let rs;

  try {

    if (isSelectQuery) {
      rs = await tursoDB.execute(query, params);
      return { rows: rs.rows };

    } else {

      rs = await tursoDB.execute(query, params);
      if (rs.rowsAffected != 0) {
        return { lastInsertRowid: Number(rs.lastInsertRowid) };
      }

    }

  } catch (error) {
    throw new Error(`❌ Error in query execution: ${error}`);
  }

}; 