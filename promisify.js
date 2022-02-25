const conn = require("./dbConnection/db");

function queryAsync(str, args) {

    return new Promise((resolve, reject) => {
        conn.query(str, args, (err, result) => {
            if (err) {
               return reject(err)
            }
           return resolve(result)
        })
    });
}
module.exports = {
    queryAsync
}