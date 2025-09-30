const express = require('express');
const router = express.Router();
const categoriesRouter = require('../controllers/categoriesController')

router.get('/', categoriesRouter.getCategories)
router.post('/', categoriesRouter.createCategories)
router.put('/:id', categoriesRouter.updateCategories)
router.delete('/:id', categoriesRouter.deleteCategories)

module.exports = router;