'use strict';

module.exports = (inaction) => {
    return (req, res, next) => {
        console.log('inside middelware',req.user);
        // console.log(req.user);

        try {
            if (req.user.actions.includes(inaction)) {
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