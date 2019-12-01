'use strict';
const express = require('express');
const router = express.Router();

/* GET admin home page. */
router.get('/', (req, res) => {
    if (checkLoginCredentials(req)) {
        switch (req.session.role) {
            case 'Finance Admin':
                res.render('admin', { admin: req.session.role, title: 'Financial' });
                break;
            case 'Sales Admin':
                res.render('admin', { admin: req.session.role, title: 'Sales' });
                break;
            case 'HR Admin':
                res.render('admin', { admin: req.session.role, title: 'HR' });
                break;
            case 'Engineering Admin':
                res.render('admin', { admin: req.session.role, title: 'Engineering' });
                break;
            default:
                res.render('admin', { admin: 'Admin' });
        }
    } else { res.redirect('/login'); }

    /*Which do you like better?
        Option 1
        switch(req.session.role){
            case 'finance_admin':
                res.render('admin',{admin: req.session.role, title: 'Financial'});
                break;
            case 'sale_admin':
                res.render('admin',{admin: req.session.role, title: 'Sales'});
                break;
            case 'hr_admin':
                res.render('admin',{admin: req.session.role, title: 'HR'});
                break;
            case 'engineering_admin':
                res.render('admin',{admin: req.session.role, title: 'Engineering'});
                break;
            default:
                res.render('admin', { admin: true });
        }
        Option 2
        var title;
        switch(req.session.role){
            case 'finance_admin':
                title = 'Financial';
                break;
            case 'sale_admin':
                title = 'Sales';
                break;
            case 'hr_admin':
                title = 'HR';
                break;
            case 'engineering_admin':
                title = 'Engineering';
                break;
            default:
                title = null;
        }
        if(title == null){res.render('admin', {admin: 'admin')};}
        else {res.render('admin', {admin: req.session.role, title: title});}
    */
});

/*GET pages for ADMIN to manage users, assigning roles to users, and the help desk*/
router.get('/manage', (req, res) => {
    if (checkLoginCredentials(req)) {
        res.render('blank', { admin: req.session.role , placeholder: 'Manage User Accounts' });
    }
    else { res.redirect('/login'); }
});
router.get('/assign', (req, res) => {
    if (checkLoginCredentials(req)) {
        res.render('blank', { admin: req.session.role , placeholder: 'Assign Roles' });
    }
    else { res.redirect('/login'); }
});
router.get('/help', (req, res) => {
    if (checkLoginCredentials(req)) {
        res.render('blank', { admin: req.session.role , placeholder: 'Help Desk' });
    }
    else { res.redirect('/login'); }
});

function checkLoginCredentials(req) {
    return (req.session.user && req.cookies.user_id && req.session.role && req.session.role.includes('Admin'));
}

module.exports = router;
