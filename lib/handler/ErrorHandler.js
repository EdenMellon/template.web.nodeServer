'use strict';
module.exports = (err, req, res, next) => {
    if (req.xhr) {
        res.locals.message = err.message || err;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.render('error');
    } else {
        let error = {
            status: err.status || 500,
            message: err.message || err,
            errors: err
        };
        // render the error page
        res.status(error.status).json(error);
    }
};