const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const {Op} = require('sequelize');
const moment = require('moment');
const { user } = require('./ApiUsers');

const ApiTransactions = {
    list: (req, res) => {
        db.transactions.findAll({
            include: ['users'],
        }).then((transactions) => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: transactions.length,
                    url: 'api/transactions',
                },
                data: transactions,
            };
            res.json(respuesta);
        });
    },

    detail: (req, res) => {
        db.transactions.findByPk(req.params.id, {
            include: ['users'],
        }).then((transactions) => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: transactions.length,
                    url: '/api/transactions/:id',
                },
                data: transactions,
            };
            res.json(respuesta);
        });
    },
    create: (req, res) => {
       
        db.transactions.create({
            concept: req.body.concept,
            date: req.body.date,
            type: req.body.type,
            amount: req.body.amount,
        }) 
            .then((confirm) => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/transactions/create',
                        },
                        data: confirm,
                    };
                } else {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/transactions/create',
                        },
                        data: confirm,
                    };
                }
/*                 res.redirect(respuesta);
 */            })
            .catch((error) => res.send(error));
    },
    update: (req, res) => {
        let transactionsId = req.params.id;
        db.transactions.update(
            {
                concept: req.body.concept,
                date: req.body.date,
                type: req.body.type,
                amount: req.body.amount,
            },
            {
                where: {id: transactionsId},
            }
        )
            .then((confirm) => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/transactions/update/:id',
                        },
                        data: confirm,
                    };
                } else {
                    respuesta = {
                        meta: {
                            status: 204,
                            total: confirm.length,
                            url: 'api/transactions/update/:id',
                        },
                        data: confirm,
                    };
                }
                res.json(respuesta);
            })
            .catch((error) => res.send(error));
    },
    destroy: (req, res) => {
        let transactionsId = req.params.id;
        db.transactions.destroy({where: {id: transactionsId}, force: true})
            .then((confirm) => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/transactions/destroy/:id',
                        },
                        data: confirm,
                    };
                } else {
                    respuesta = {
                        meta: {
                            status: 204,
                            total: confirm.length,
                            url: 'api/transactions/destroy/:id',
                        },
                        data: confirm,
                    };
                }
                res.redirect('/movements');
            })
            .catch((error) => res.send(error));
    },
};

module.exports = ApiTransactions;

