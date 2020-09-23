'use strict';


module.exports = (inaction) => {
    return (req, res, next) => {
        console.log('inside middelware');
        console.log(req.user);

        if (req.user.action.includes(inaction)) {
            next();
        } else {
            next('invalid premision');
        };
    };
};