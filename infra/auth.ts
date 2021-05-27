import * as jwt from 'jsonwebtoken';
import Configs from './configs';

class Auth {
    validate(request, response, next) {
        let token = request.headers['x-access-token'];

        if (token) {
            jwt.verify(token, Configs.secret, function(err, decoded) {
                if (err) {
                    return response.status(403).send({
                        success: false,
                        message: '403 - Invalid token'
                    });
                } else {
                    next();
                }
            });
        } else {
            return response.status(401).send({
                success: false,
                message: '401 - Unathorized'
            });
        }
    }
}

export default new Auth();
