import { connection } from "./connection.js";

export const supports = () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 35 MINUTE);`,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  };