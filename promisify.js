const conn = require("./model/db");
const queryAsync = (sql, arg) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, arg, (err, result) => {
            if (err) {
                reject(err.message)
            }
            resolve(result)
        })
    });
}
module.exports = {
    queryAsync
}


