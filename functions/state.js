
const read = require('./db/read');
const update = require('./db/update');

exports.handler = async (event, context) => {
    event.id = '298643979610620423'
    var response
    if (event.httpMethod == 'GET') {
        response = await read.handler('state', event, context)
    } else if (event.httpMethod == 'PUT') {
        const body = JSON.parse(event.body)
        if (body.state != 'on' && body.state != 'off' && body.state != 'alert') {
            return {
                statusCode: 400,
                body: 'Wrong parameter (must a JSON with "state" equal to "on", "off" or "alert")'
            }
        }
        response = await update.handler('state', event, context)
    } else {
        return {
            statusCode: 404,
            body: 'Not Found (use GET or PUT)'
        }
    }

    const state = JSON.parse(response.body)
    return {
        statusCode: 200,
        body: state.state
    }
}
