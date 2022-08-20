const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/api/ApiUsers');
const TransactionsController = require('../Controllers/api/ApiTransactions');


/* all users */
router.get('/users', adminController.users); 
/* user detail */
router.get('/user/:id', adminController.user); 
/* create user */
router.post('/create', adminController.userCreate);
/* user update */ 
router.put('/update/:id', adminController.updateUser);
/* delete user */
router.delete('/delete/:id', adminController.destroy);

/* Transactions */
router.get('/transactions', TransactionsController.list);
/* transaction detail */
router.get('/transaction/:id', TransactionsController.detail);
//filter transactions. Puede colocar desde 1 hasta 10
router.get('/transactions/:id', TransactionsController.recomended);
//Agregar una película
router.post('/create', TransactionsController.create);
//Modificar una película
router.put('/transaction/update/:id', TransactionsController.update);
//Eliminar una película
router.delete('/transaction/delete/:id', TransactionsController.destroy);



module.exports = router