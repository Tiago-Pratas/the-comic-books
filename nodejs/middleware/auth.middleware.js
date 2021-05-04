const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/auth/login');
    }
};

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role === 'admin') {
            return next();
        } else {
            const error = new Error('please log in to view this page');
            error.status = 403;
            return next(error);
        }
    } else {
        return res.redirect('/auth/login');
    }
};

export { isAdmin, isAuthenticated };
