
const db = require('./db/read-all');

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
    const response = await db.handler('users', event, context)
    const users = JSON.parse(response.body)

    // Check if user and password are correct
    const ok = users.some(item => {
        return credentials.user == item.user && credentials.pass == item.pass
    })    
    if (ok) {
        return {
            statusCode: 200,
            body: 'Login succesful'
        }
    } else {
        return {
            statusCode: 401,
            body: 'User or password incorrect'
        }
    }
}
