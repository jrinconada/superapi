
const db = require('./db/create');

exports.handler = async (event, context) => {
    // Get credentials
    const credentials = JSON.parse(event.body)
    if (!credentials.user || !credentials.pass) {
        return {
            statusCode: 400,
            body: 'Bad Request, excepted JSON with strings: "user" & "pass"'
        }
    }

    // Connect to database
    return db.handler('users', event, context)
}
