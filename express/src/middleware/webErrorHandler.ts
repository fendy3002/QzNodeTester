export default (config) => (err, req, res, next) => {
    let log = config.storage.get('log');
    log.error({
        id: req.id,
        message: err.message,
        stack: err.stack
    });
    if (err.response) {
        log.error({
            id: req.id,
            text: err.response.text,
            status: err.response.status
        });
    }
    if (err.status) {
        // TODO: should've take care for each status
        return res.render("error/500.html", {
            err
        });
    }
    else {
        return res.render("error/500.html", {
            err
        });
    }
};