'use strict';

module.exports = (inaction) => {
    return (req, res, next) => {
        console.log('inside middelware',req.user.token.action);
        // console.log(req.user);

        try {
            if (req.user.token.action.includes(inaction)) {
                console.log('in iuf');
                next();
            } else {
                next('invalid premision');
            };
        } catch (e) {
            next(e);
        }
    };
};