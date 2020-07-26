const express = require('express');
const transactionRouter = express.Router();
const controller = require('../services/transactionService');

transactionRouter.get('/:period', controller.getTransactions);
transactionRouter.post('/', controller.createTransaction);
transactionRouter.put('/:id', controller.updateTransaction);
transactionRouter.delete('/:id', controller.deleteTransaction);

module.exports = transactionRouter;
