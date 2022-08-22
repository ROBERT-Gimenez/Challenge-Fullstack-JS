const cookieSession = (req, res, next) => {
    if(req.cookies.AlkemyCookie){
        req.session.user = req.cookies.AlkemyCookie;
        res.locals.user = req.session.user;
    }
    next()
}

module.exports = cookieSession;