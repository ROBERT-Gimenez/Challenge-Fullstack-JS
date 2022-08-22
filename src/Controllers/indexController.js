const { validationResult } = require('express-validator');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let bcrypt =require('bcryptjs');
const db =require('../database/models');
const fs = require('fs');
const path = require('path');


module.exports = {
    movements:(req, res)=> {
        db.transactions.findAll()
        .then((movements) => {

        
        res.render('movements' ,{
          title:"move",
          toThousand,
          movements,
          session: req.session

          })
        }).catch((err) => {res.send(err)})
      },
    index: (req, res)=> {
          res.render('home' ,{
            title:"move",
			toThousand,
            session: req.session

            })  
        },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){

            db.users.findOne({
                where:{ email: req.body.email}
            })
            .then((user)=>{
                req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                rol: user.rol_id
            } 
            
            if(req.body.recordar){
                const TIME_IN_MILISECONDS = 60000;
                res.cookie('AlkemyCookie', req.session.user, {
                    expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                    httpOnly: true,
                    secure: true
                })
            }

            res.locals.user = req.session.user
            console.log(req.session.user.id)
            res.redirect('/movements')
        }).catch(( error )=> {console.log(error)})
        }else{
            res.render('home' , {
                titulo: "Login",
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    logout: (req, res) => {
        req.session.destroy();

        if(req.cookies.Bikemastercookie){
            res.cookie('AlkemyCookie', "", { maxAge: -1 })
        }

        res.redirect('/')
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
             
        if(errors.isEmpty()){
            db.users.create({
                name:req.body.name,
                email: req.body.email,
                rol_id: 1,
                password: bcrypt.hashSync(req.body.password , 10),
            })
            .then((user) => { res.redirect('/')})
            .catch((error)=> {res.send(error)})
        }else{
            //Código para mostrar errores
            res.render('home', {
                titulo: "Register",
                errors: errors.mapped(),
                session: req.session,
                old: req.body
            })
        }
    },
}
