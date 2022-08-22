const { validationResult } = require('express-validator');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let bcrypt =require('bcryptjs');
const db =require('../../database/models');
const fs = require('fs');
const path = require('path');
const { Op } = require("sequelize");


module.exports = {
users : (req, res) => {
    db.users.findAll()
    .then((users) => {
        let respuesta = {meta :{
        status:200,
        total:users.length,
        url:'/api/users'
        }, data:users }
   
        res.status(200).json(respuesta)
        }).catch((error) => res.status(400).send(error))
    
    
},
 user: (req, res) => {
    db.users.findByPk(req.params.id)
    .then((users) => {
        if(users){
        let respuesta = {meta :{
        status:200,
        total:users.length,
        url:'/api/users/:id'
        }, data:users }
   
        res.status(200).json(respuesta)
        }else{ return res.status(404).json({
            meta: {
                status: 404,
                msg: "Not found",
            },
        });
    }
})
.catch((error) => res.status(400).send(error));
},
userCreate:(req,res)=>{
            db.users.create({
                name:req.body.name,
                email: req.body.email,
                rol_id: 1,
                password: bcrypt.hashSync(req.body.password , 10),
            })
            .then((confirm) => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/users/create',
                        },
                        data: confirm,
                    };
                } else {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/users/create',
                        },
                        data: confirm,
                    };
                }
                res.json(respuesta);
                }).catch((error)=> {res.send(error)})
    
},
updateUser: (req, res) => {
let userId = req.params.id;
        db.users.update(
            {
                first_name: req.body.first_name,
                phone: req.body.phone,
            },
            {
                where: {id: userId},
            }
        )
            .then((confirm) => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/users/update/:id',
                        },
                        data: confirm,
                    };
                } else {
                    respuesta = {
                        meta: {
                            status: 204,
                            total: confirm.length,
                            url: 'api/users/update/:id',
                        },
                        data: confirm,
                    };
                }
                res.json(respuesta);
            })
            .catch((error) => res.send(error));
    },
    destroy: (req, res) => {
        let userId = req.params.id;
        db.users.destroy({where: {id: userId}, force: true})
            .then((confirm) => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/users/delete/:id',
                        },
                        data: confirm,
                    };
                } else {
                    respuesta = {
                        meta: {
                            status: 204,
                            total: confirm.length,
                            url: 'api/users/delete/:id',
                        },
                        data: confirm,
                    };
                }
                res.json(respuesta);
            })
            .catch((error) => res.send(error));
    },
};
