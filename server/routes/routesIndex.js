/**
 * Created by mathieu on 13/12/16.
 */

"use strict";
module.exports = (app) => {
    // Dependencies
    let Index       = require('../../model/indexHpHc');
    let test        = require('../modules/security');

    //display index registration page
    app.get('/', (req, res) => {
        res.render('pages/index')
    });

    //display historic index page
    app.get('/historic', (req, res) => {
        Index.find((err, indexs) => {
            if(err){
                throw err
            }
            res.render('pages/historic',{indexs : indexs})
        });
    });

    //Analyzes new user index inputs, put in bdd and redirects
    app.post('/', (req, res) => {

        if (test.empty(req.body.hc) || test.empty(req.body.hp)) {
            req.flash("err", 'Vous devez renseigner les deux champs :( ');
            res.redirect('/')
        } else {

            if (test.index(req.body.hc) || test.index(req.body.hp)) {
                req.flash("err", 'Vous ne devez renseigner que des nombres entre 1 et 99999 :( ');
                res.redirect('/')

            } else {

                let data = {'hc': req.body.hc, 'hp': req.body.hp, created_at: new Date()};

                Index.create(data, () =>{
                    req.flash("success", "Votre enregistrement c'est bien déroulé ;)");
                    res.redirect('/historic')
                });
            }
        }
    });
};