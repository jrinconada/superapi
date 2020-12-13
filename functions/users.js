
const db = require('./db/read-all');

exports.handler = async (event, context) => {
    const response = await db.handler('users', event, context)
    const users = JSON.parse(response.body)
    const names = users.map((item) => {
      return item.user
    })
    return {
        statusCode: 200,
        body: JSON.stringify(names)
    }
}
