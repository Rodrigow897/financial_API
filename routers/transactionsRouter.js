const express = require('express');
const router = express.Router();
const transactionsRouter = require('../controllers/transactionsController')

router.get('/', transactionsRouter.getTransactions)
router.post('/', transactionsRouter.createTransactions)
router.patch('/:id', transactionsRouter.patchTransactions)
router.delete('/:id', transactionsRouter.deleteTransactions)

module.exports = router;