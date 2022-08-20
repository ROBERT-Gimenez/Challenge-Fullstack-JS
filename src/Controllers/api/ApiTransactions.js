const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const {Op} = require('sequelize');
const moment = require('moment');

const Transactions = db.Transactions;

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
    recomended: (req, res) => {
        db.transactions.findAll({
            include: ['users'],
            where: {
                date: {[db.Sequelize.Op.gte]: req.params.date},
            },
            order: [['date', 'DESC']],
        })
            .then((transactions) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: transactions.length,
                        url: 'api/transactions/recomended/:date',
                    },
                    data: transactions,
                };
                res.json(respuesta);
            })
            .catch((error) => console.log(error));
    },
    create: (req, res) => {
        transactions.create({
            concept: req.body.concept,
            date: req.body.date,
            type: req.body.type,
            amount: req.body.amount,
            users_id: req.session.id,
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
                res.json(respuesta);
            })
            .catch((error) => res.send(error));
    },
    update: (req, res) => {
        let transactionsId = req.params.id;
        transactions.update(
            {
                concept: req.body.concept,
                date: req.body.date,
                type: req.body.type,
                amount: req.body.amount,
                users_id: req.session.user.id,
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
        transactions.destroy({where: {id: transactionsId}, force: true})
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
                res.json(respuesta);
            })
            .catch((error) => res.send(error));
    },
};

module.exports = ApiTransactions;

