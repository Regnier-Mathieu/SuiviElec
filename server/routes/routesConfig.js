/**
 * Created by mathieu on 13/12/16.
 */

"use strict";
module.exports      = (app) => {

    // Dependencies
    let Index       = require('../../model/indexHpHc');
    let Config      = require('../../model/config');
    let test        = require('../modules/security');

    //display config page
    app.get('/config', (req, res) => {
        Config.findOne({exist : true},(err, config) => {
            if(err){
                throw err
            }
            res.render('pages/config',{config : config})
        });
    });

    // Analyses new configuration and put in bdd
    app.post('/config', (req, res) => {

        let secuOk      = 0;
        let data    = {
            'hc': req.body.hc,
            'hp': req.body.hp,
            'Monthly': req.body.abo,
            'subscription': req.body.subs,
            'unitHpPrice': req.body.hpp,
            'unitHcPrice': req.body.hcp,
            'billingDate': req.body.date,
            'lowTVA': req.body.ltva,
            'HighTVA': req.body.htva,
            'CSPEprice': req.body.CSPE,
            'taxMuni': req.body.tm,
            'taxDep': req.body.td,
            'CTA': req.body.CTA,
            'exist': true
        };
        let dataNumber    = {
            'Monthly': req.body.abo,
            'subscription': req.body.subs,
            'unitHpPrice': req.body.hpp,
            'unitHcPrice': req.body.hcp,
            'lowTVA': req.body.ltva,
            'HighTVA': req.body.htva,
            'CSPEprice': req.body.CSPE,
            'taxMuni': req.body.tm,
            'taxDep': req.body.td,
            'CTA': req.body.CTA
        };

        if (test.empty(data)) {
            req.flash("err", 'Vous devez renseigner tous les champs :( ');
            secuOk++;
            res.redirect('/config')
        }

        if (test.index(req.body.hc) || test.index(req.body.hp)) {
            req.flash("err", 'Vous ne devez renseigner que des nombres entre 0 et 99999 pour vos indexs :( ');
            secuOk++;
            res.redirect('/config')
        }
        if (test.price(dataNumber)) {
            req.flash("err", 'Vous ne devez renseigner un nombre entre 0 et 999 € pour les différents prix :( ');
            secuOk++;
            res.redirect('/config')
        }

        if (test.date(req.body.date)) {
            req.flash("err", 'veuillez respecter le bon format pour la date :( ');
            secuOk++;
            res.redirect('/config')
        }

        if(secuOk == 0) {
            Config.find({exist: true}, (err, config) => {

                if (err) {
                    throw err
                }
                else {
                    if (config.length == 0) {

                        Config.create(data, () => {
                            req.flash("success", "Votre enregistrement c'est bien déroulé ;)");
                            res.redirect('/config')
                        });
                    }
                    else {
                        let query = {'exist': true};

                        Config.findOneAndUpdate(query, data, (err) =>{
                            if (err) {
                                throw err
                            }
                            else{
                                let hpandhc = {'hp': data.hp, 'hc': data.hc, 'created_at': data.billingDate}
                                let query   = Index.find({});

                                query.limit(1);
                                query.exec( (err, index) => {
                                    if(err){
                                        throw err
                                    }else
                                    {
                                        if(index.length == 0){
                                            Index.create(hpandhc, (err) => {
                                                if (err) {
                                                    throw err
                                                }
                                                req.flash("success", "Votre enregistrement c'est bien déroulé ;)");
                                                res.redirect('/config')
                                            });
                                        }
                                        else{
                                            Index.findOneAndUpdate(index, hpandhc, (err) => {
                                                if (err) {
                                                    throw err
                                                }
                                            });
                                            req.flash("success", "Votre enregistrement c'est bien déroulé ;)");
                                            res.redirect('/config')
                                        }
                                    }

                                });
                            }
                        })
                    }
                }
            })
        }
    })
};

