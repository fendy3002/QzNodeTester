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
        let resContent: any = {};
        if (err.message) {
            resContent.message = err.message;
        }
        if (err.code) {
            resContent.code = err.code;
        }
        if (err.stack) {
            resContent.stack = err.stack;
        }
        return res.status(err.status).json({...resContent});
    }
    else {
        return res.json({
            message: err.message,
            stack: err.stack,
            code: err.code
        }, 500);
    }
};